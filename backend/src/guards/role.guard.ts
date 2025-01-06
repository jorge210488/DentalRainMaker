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
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    // console.log('RolesGuard: Required roles:', requiredRoles)

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    // console.log(
    //   'RolesGuard: User from request:',
    //   user ? user.user_id : 'No user found',
    // )

    if (!user || !user.user_id) {
      throw new ForbiddenException('User ID not found in request')
    }

    const userWithRole = await this.userModel
      .findById(user.user_id)
      .populate('type')
      .exec()

    if (!userWithRole) {
      throw new ForbiddenException('User does not exist')
    }

    const userRole = userWithRole.type.name

    // console.log('RolesGuard: User role:', userRole)

    if (!userRole) {
      throw new ForbiddenException('User role not found')
    }

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
