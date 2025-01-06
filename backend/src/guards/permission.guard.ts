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
    // Obtener los permisos requeridos desde el decorador
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    )

    if (!requiredPermissions) {
      // Si no se definen permisos, permitir el acceso
      return true
    }

    // Obtener el usuario desde la solicitud
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    // Verificar si el usuario tiene los permisos necesarios
    const userPermissions = user.permissions || []
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    )

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
