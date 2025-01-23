import { Module } from '@nestjs/common'
import { ClinicsModule } from '../clinics/clinics.module'
import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ContactsModule } from 'src/contacts/contacts.module'

@Module({
  imports: [ClinicsModule, HttpModule, ConfigModule, ContactsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClinicConfigService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
