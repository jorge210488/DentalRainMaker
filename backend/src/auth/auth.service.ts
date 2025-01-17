import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Credential, CredentialDocument } from './schemas/credential.schema'
import { Role, RoleDocument } from '../roles/schemas/role.schema'
import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { NodemailerService } from '../nodemailer/nodemailer.service'
import { ContactsService } from '../contacts/contacts.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Credential.name)
    private credentialModel: Model<CredentialDocument>,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
    private readonly contactsService: ContactsService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const {
      email,
      password,
      provider,
      providerId,
      given_name,
      family_name,
      name,
      type,
      clinic_id,
    } = createUserDto

    // Verificar si el email ya existe en la clínica
    const contactsResponse = await this.contactsService.getContacts(clinic_id)

    let remoteId: string

    if (contactsResponse?.contacts) {
      const contactExists = contactsResponse.contacts.find(
        (contact) => contact.primary_email_address === email,
      )

      if (contactExists) {
        console.log(
          `The email ${email} is already registered in clinic ${clinic_id}. Using existing contact.`,
        )
        remoteId = contactExists.remote_id // Usar el remote_id existente
      } else {
        // Si no existe, crear el contacto
        const combinedName =
          provider === 'local' ? `${given_name} ${family_name}` : name

        const contactData = {
          name: combinedName,
          given_name,
          family_name,
          email_addresses: [
            {
              address: email,
            },
          ],
          type: type || 'PATIENT', // Default to 'PATIENT' if type is not provided
        }

        try {
          const contactResponse = await this.contactsService.createContact(
            clinic_id,
            contactData,
          )

          remoteId = contactResponse?.remote_id
          if (!remoteId) {
            console.warn(
              `Contact created in clinic ${clinic_id}, but no remote_id was returned.`,
            )
          }
        } catch (error) {
          console.error(
            `Failed to create contact in clinic ${clinic_id}: ${error.message}`,
          )
          throw new HttpException(
            `Failed to create contact in clinic ${clinic_id}.`,
            HttpStatus.BAD_GATEWAY,
          )
        }
      }
    } else {
      console.warn(
        `Invalid contacts response format for clinic ${clinic_id}. Aborting user creation.`,
      )
      throw new BadRequestException(
        `Failed to fetch contacts for clinic ${clinic_id}.`,
      )
    }

    // Generar contraseña si es necesario
    const generatedPassword =
      provider !== 'local' && !password
        ? crypto.randomBytes(8).toString('hex')
        : password

    // Verificar y asignar el rol correspondiente
    const role = await this.roleModel.findOne({ name: type || 'PATIENT' })
    console.log('Fetched role:', role)
    if (!role) {
      throw new BadRequestException(`Role ${type || 'PATIENT'} not found.`)
    }

    // Guardar las credenciales, incluyendo el remote_id
    const credential = new this.credentialModel({
      email,
      password: generatedPassword,
      provider,
      providerId,
      remote_id: remoteId, // Usar el remote_id existente o recién creado
      clinic_id,
      type: role._id,
    })
    console.log('Credential to be saved:', credential)
    await credential.save()

    // Enviar correo de bienvenida
    await this.nodemailerService.sendRegistrationEmail(
      email,
      'Welcome to Dental Rain Maker',
      provider === 'local' ? `${given_name} ${family_name}` : name,
      type,
    )

    return {
      message: 'User successfully created',
      contact: remoteId ? { remote_id: remoteId } : null,
      credential: {
        email: credential.email,
        remote_id: credential.remote_id,
        clinic_id: credential.clinic_id,
      },
    }
  }

  // Método para iniciar sesión
  async signin(userData: LoginUserDto): Promise<{ token: string }> {
    const { email, provider, providerId, password } = userData

    // Busca las credenciales
    const credential = await this.credentialModel
      .findOne({ email })
      .populate('type') // Incluye los datos del esquema `Role`
      .exec()
    console.log('Saved credential with populated type:', credential)
    if (!credential) {
      throw new NotFoundException('User not found. Please register first.')
    }

    // Validación para el proveedor local
    if (provider === 'local') {
      if (!credential.password) {
        throw new UnauthorizedException(
          'Password not set. This account uses third-party authentication.',
        )
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        credential.password,
      )
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password.')
      }
    }

    // Validación para proveedores externos
    if (provider !== 'local') {
      if (
        credential.provider !== provider ||
        credential.providerId !== providerId
      ) {
        throw new UnauthorizedException(
          'Invalid provider or provider ID for this user.',
        )
      }
    }

    const token = this.jwtService.sign({
      sub: credential._id,
      user_id: credential.remote_id,
      type: credential.type.name,
      email: credential.email,
      clinic_id: credential.clinic_id,
      views: credential.type.views || [],
    })

    return {
      token,
    }
  }
}
