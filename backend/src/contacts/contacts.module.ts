import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { ContactsService } from './contacts.service'
import { ContactsController } from './contacts.controller'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ClinicsModule } from 'src/clinics/clinics.module'
import { BrevoModule } from 'src/brevo/brevo.module'

@Module({
  imports: [HttpModule, ConfigModule, ClinicsModule, BrevoModule],
  providers: [ContactsService, ClinicConfigService],
  controllers: [ContactsController],
  exports: [ContactsService],
})
export class ContactsModule {}
