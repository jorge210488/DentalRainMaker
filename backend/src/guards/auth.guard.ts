import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector, // Agregado para manejar metadata
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar si el endpoint es público
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) {
      console.log('AuthGuard: Public route accessed')
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')[1] ?? ''

    console.log(
      token ? 'AuthGuard: Token found' : 'AuthGuard: No token provided',
    )

    if (!token) {
      throw new UnauthorizedException('Bearer token not found')
    }

    const secret = process.env.JWT_SECRET

    try {
      const payload = this.jwtService.verify(token, { secret })

      if (payload) {
        console.log('AuthGuard: Token is valid')
        payload.iat = new Date(payload.iat * 1000)
        payload.exp = new Date(payload.exp * 1000)

        // Obtener el usuario completo desde la base de datos
        const user = await this.userModel
          .findById(payload.user_id)
          .populate('type') // Popular el rol asociado al usuario
          .exec()

        if (!user) {
          throw new UnauthorizedException('User not found')
        }

        console.log(
          `AuthGuard: Payload - User ID: ${user._id}, Role: ${user.type.name}, Permissions: ${user.type.permissions}`,
        )

        // Añadir los permisos del rol al objeto `request.user`
        request.user = {
          ...payload,
          user_id: user._id,
          role: user.type.name,
          permissions: user.type.permissions || [], // Asegurarse de incluir permisos como un array
        }

        return true
      }
    } catch (error) {
      // Log para tokens inválidos
      console.error('AuthGuard: Invalid token detected', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      })
      throw new UnauthorizedException('Invalid Token')
    }

    // Log para cualquier otro caso no manejado
    console.log('AuthGuard: Unhandled case')
    return false
  }
}
