import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('PermissionsGuard: Checking permissions...')

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    )

    // console.log(
    //   'PermissionsGuard: Required permissions:',
    //   requiredPermissions || 'None specified',
    // )

    if (!requiredPermissions) {
      //   console.log('PermissionsGuard: No permissions required, access granted.')
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    // console.log(
    //   'PermissionsGuard: User from request:',
    //   user ? user.user_id : 'No user found',
    // )

    if (!user) {
      console.log('PermissionsGuard: User not authenticated.')
      throw new ForbiddenException('User not authenticated')
    }

    const userPermissions = user.permissions || []
    // console.log('PermissionsGuard: User permissions:', userPermissions)

    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    )

    console.log(
      'PermissionsGuard: User has required permissions:',
      hasPermission,
    )

    if (!hasPermission) {
      //   console.log('PermissionsGuard: Insufficient permissions, access denied.')
      throw new ForbiddenException('Insufficient permissions')
    }

    // console.log('PermissionsGuard: Access granted.')
    return true
  }
}
