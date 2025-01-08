import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user || !user.user_id) {
      throw new ForbiddenException('User ID not found in request')
    }

    const userWithRole = await this.userModel
      .findById(user.user_id)
      .populate('type') // Popular el rol asociado al usuario
      .exec()

    if (!userWithRole) {
      throw new ForbiddenException('User does not exist')
    }

    const userRole = userWithRole.type?.name

    if (!userRole) {
      throw new ForbiddenException('User role not found')
    }

    console.log(`RolesGuard: User has role: ${userRole}`)
    return true
  }
}
