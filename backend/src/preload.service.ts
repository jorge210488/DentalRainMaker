import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { PermissionsService } from './permissions/permissions.service'
import { RolesService } from './roles/roles.service'
import { AuthService } from './auth/auth.service'
import { UsersService } from './users/users.service'
import { ClinicsService } from './clinics/clinics.service'

@Injectable()
export class PreloadService implements OnModuleInit {
  private readonly logger = new Logger(PreloadService.name)

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService,
    private readonly clinicsService: ClinicsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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

      // Preload Clinics
      await this.clinicsService.preloadClinics()
      this.logger.log('Clinics preload completed.')

      // Preload Auth Users
      await this.authService.preloadUsers()
      this.logger.log('Auth users preload completed.')

      // Preload Updated Users
      await this.usersService.preloadUpdateUsers()
      this.logger.log('Updated users preload completed.')
    } catch (error) {
      this.logger.error('Error during preload process:', error.message)
    }

    this.logger.log('Preload process completed.')
  }
}
