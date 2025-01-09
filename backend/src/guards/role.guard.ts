import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found in request')
    }

    console.log(`RolesGuard: User role is ${user.role}`)

    return true
  }
}
