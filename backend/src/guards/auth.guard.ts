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
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector, // Agregado para manejar metadata
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard: Checking route:', {
      path: context.switchToHttp().getRequest().url,
      method: context.switchToHttp().getRequest().method,
    })

    // Verificar si es una ruta pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // console.log(`AuthGuard: Metadata isPublic - ${isPublic}`)

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

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      })

      if (payload) {
        console.log('AuthGuard: Token is valid')
        const user = await this.userModel
          .findById(payload.user_id)
          .populate('type')
          .exec()

        if (!user) {
          throw new UnauthorizedException('User not found')
        }

        console.log(
          `AuthGuard: Payload - User ID: ${user._id}, Role: ${user.type.name}`,
        )
        request.user = {
          ...payload,
          user_id: user._id,
          role: user.type.name,
          permissions: user.type.permissions || [],
        }

        return true
      }
    } catch (error) {
      console.error('AuthGuard: Invalid token detected', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      })
      throw new UnauthorizedException('Invalid Token')
    }

    console.log('AuthGuard: Unhandled case')
    return false
  }
}
