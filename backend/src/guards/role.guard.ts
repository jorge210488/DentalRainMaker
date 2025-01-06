import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener los roles requeridos desde el decorador
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    console.log('RolesGuard: Required roles:', requiredRoles)

    if (!requiredRoles) {
      return true // Si no se requiere ningún rol, se permite el acceso
    }

    // Obtener la solicitud HTTP y el usuario
    const request = context.switchToHttp().getRequest()
    const user = request.user

    console.log(
      'RolesGuard: User from request:',
      user ? user._id : 'No user found',
    )

    if (!user || !user._id) {
      throw new ForbiddenException('User ID not found in request')
    }

    // Consultar el usuario y popular su rol
    const userWithRole = await this.userModel
      .findById(user._id)
      .populate('type') // Popular el campo `type` que está relacionado con el esquema Role
      .exec()

    if (!userWithRole) {
      throw new ForbiddenException('User does not exist')
    }

    // Obtener el nombre del rol del usuario
    const userRole = userWithRole.type.name

    console.log('RolesGuard: User role:', userRole)

    if (!userRole) {
      throw new ForbiddenException('User role not found')
    }

    // Verificar si el rol del usuario está en la lista de roles requeridos
    const hasRole = requiredRoles.includes(userRole)

    console.log('RolesGuard: User has required role:', hasRole)

    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have permission to access this route',
      )
    }

    return true
  }
}
