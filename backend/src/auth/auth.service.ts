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
import * as localUsersData from '../utils/localUsers.json'
import * as googleUsersData from '../utils/googleUsers.json'

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

    const generatedPassword =
      provider !== 'local' && !password
        ? crypto.randomBytes(8).toString('hex')
        : password

    const credential = new this.credentialModel({
      email,
      password: generatedPassword,
      provider,
      providerId,
    })
    await credential.save()

    const role = await this.roleModel.findOne({ name: type || 'PATIENT' })
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

    const user = await this.userModel
      .findOne({ credential: credential._id })
      .populate('type')

    if (!user) {
      throw new NotFoundException('User not found for these credentials.')
    }

    const token = this.jwtService.sign({
      sub: credential._id,
      user_id: user._id,
      role: user.type.name,
      email: credential.email,
    })

    return {
      token,
      userId: user._id,
      type: user.type.name,
    }
  }

  async preloadUsers(): Promise<void> {
    try {
      // Cargar usuarios locales
      for (const localUser of localUsersData) {
        try {
          const createUserDto: CreateUserDto = {
            email: localUser.email,
            password: localUser.password,
            confirmPassword: localUser.password,
            provider: localUser.provider,
            given_name: localUser.given_name,
            family_name: localUser.family_name,
            type: localUser.type,
          }
          await this.signup(createUserDto)
          // console.log(`Local user ${localUser.email} created successfully.`)
        } catch (error) {
          console.error(
            `Failed to create local user ${localUser.email}:`,
            error.message,
          )
        }
      }

      // Cargar usuarios de Google
      for (const googleUser of googleUsersData) {
        try {
          const createUserDto: CreateUserDto = {
            email: googleUser.email,
            provider: googleUser.provider,
            providerId: googleUser.providerId,
            given_name: googleUser.given_name,
            family_name: googleUser.family_name,
            name: googleUser.name,
            type: googleUser.type,
          }
          await this.signup(createUserDto)
          // console.log(`Google user ${googleUser.email} created successfully.`)
        } catch (error) {
          console.error(
            `Failed to create Google user ${googleUser.email}:`,
            error.message,
          )
        }
      }
      // console.log('Preload of users completed successfully.')
    } catch (error) {
      console.error('Error during user preload:', error.message)
      throw new BadRequestException('Failed to preload users.')
    }
  }
}
