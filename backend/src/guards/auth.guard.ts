import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      console.log('AuthGuard: Invalid token detected')
      throw new UnauthorizedException('Invalid Token')
    }

    // Log para cualquier otro caso no manejado
    console.log('AuthGuard: Unhandled case')
    return false
  }
}
