import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { PermissionsService } from './permissions/permissions.service'
import { RolesService } from './roles/roles.service'
import { ContactsService } from './contacts/contacts.service'
import { ClinicsService } from './clinics/clinics.service'
import { FirebaseAdmin } from './config/firebaseAdmin'

@Injectable()
export class PreloadService implements OnModuleInit {
  private readonly logger = new Logger(PreloadService.name)

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService,
    private readonly clinicsService: ClinicsService,
    private readonly contactsService: ContactsService,
    private readonly firebaseAdmin: FirebaseAdmin,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Starting preload process...')

    try {
      // Probar la conexión con Firebase
      await this.firebaseAdmin.testFirebaseConnection()
      this.logger.log('Firebase connection verified.')

      // Preload Permissions
      await this.permissionsService.preloadPermissions()
      this.logger.log('Permissions preload completed.')

      // Preload Roles
      await this.rolesService.preloadRoles()
      this.logger.log('Roles preload completed.')

      // Preload Clinics
      await this.clinicsService.preloadClinics()
      this.logger.log('Clinics preload completed.')

      // Preload Brevo Contacts
      await this.contactsService.preloadContactsToBrevo()
      this.logger.log('Brevo Contacts preload completed.')
    } catch (error) {
      this.logger.error('Error during preload process:', error.message)
    }

    this.logger.log('Preload process completed.')
  }
}
