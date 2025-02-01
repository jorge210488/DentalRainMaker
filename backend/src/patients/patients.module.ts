import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PatientController } from './patients.controller'
import { PatientService } from './patients.service'
import { ConfigModule } from '@nestjs/config'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ClinicsModule } from 'src/clinics/clinics.module'
import { AppointmentsModule } from 'src/appointments/appointments.module'
import { InsuranceService } from 'src/insurance/insurance.service'
import { ContactsService } from 'src/contacts/contacts.service'
import { BrevoModule } from 'src/brevo/brevo.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    ClinicsModule,
    AppointmentsModule,
    BrevoModule,
  ],
  providers: [
    PatientService,
    ClinicConfigService,
    InsuranceService,
    ContactsService,
  ],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
