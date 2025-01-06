import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { PermissionsService } from './permissions/permissions.service'
import { RolesService } from './roles/roles.service'

@Injectable()
export class PreloadService implements OnModuleInit {
  private readonly logger = new Logger(PreloadService.name)

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Starting preload process...')

    try {
      // Preload Permissions
      await this.permissionsService.preloadPermissions()
      this.logger.log('Permissions preload completed.')

      // Preload Roles
      await this.rolesService.preloadRoles()
      this.logger.log('Roles preload completed.')
    } catch (error) {
      this.logger.error('Error during preload process:', error.message)
    }

    this.logger.log('Preload process completed.')
  }
}
