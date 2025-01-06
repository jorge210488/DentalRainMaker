import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Credential, CredentialDocument } from './schemas/credential.schema'
import { User, UserDocument } from '../users/schemas/user.schema'
import { Role, RoleDocument } from '../roles/schemas/role.schema'
import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Credential.name)
    private credentialModel: Model<CredentialDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Role.name) // Inyección del modelo Role
    private roleModel: Model<RoleDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async signup(createUserDto: CreateUserDto): Promise<UserDocument> {
    const {
      email,
      password,
      provider,
      providerId,
      given_name,
      family_name,
      name,
      type,
    } = createUserDto

    const existingCredential = await this.credentialModel.findOne({ email })
    if (existingCredential) {
      throw new BadRequestException('Email is already in use.')
    }

    // Generar un password aleatorio si el proveedor no es local y no se envió un password
    const generatedPassword =
      provider !== 'local' && !password
        ? crypto.randomBytes(8).toString('hex') // Genera una contraseña aleatoria
        : password

    const credential = new this.credentialModel({
      email,
      password: generatedPassword,
      provider,
      providerId,
    })
    await credential.save()

    // Validar y obtener el rol asociado al usuario
    const role = await this.roleModel.findOne({ name: type || 'PATIENT' }) // Busca el rol en base al nombre
    if (!role) {
      throw new BadRequestException(`Role ${type || 'PATIENT'} not found.`)
    }

    const combinedName =
      provider === 'local' ? `${given_name} ${family_name}` : name

    const user = new this.userModel({
      name: combinedName,
      given_name,
      family_name,
      type: role._id, // Asigna la referencia al ID del rol
      primary_email_address: email,
      credential: credential._id,
    })

    return user.save()
  }

  // Método para iniciar sesión
  async signin(
    userData: LoginUserDto,
  ): Promise<{ token: string; userId: string; type: string }> {
    const { email, provider, providerId, password } = userData

    // Busca las credenciales
    const credential = await this.credentialModel.findOne({ email })
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

    // Busca el usuario relacionado usando el credential_id
    const user = await this.userModel
      .findOne({ credential: credential._id })
      .populate('type') // Popular el campo `type` para obtener el rol asociado

    if (!user) {
      throw new NotFoundException('User not found for these credentials.')
    }

    const token = this.jwtService.sign({
      sub: credential._id,
      email: credential.email,
      role: user.type.name,
    })

    return {
      token,
      userId: user._id,
      type: user.type.name,
    }
  }
}
