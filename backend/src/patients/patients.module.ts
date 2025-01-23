import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PatientController } from './patients.controller'
import { PatientService } from './patients.service'
import { ConfigModule } from '@nestjs/config'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ClinicsModule } from 'src/clinics/clinics.module'
import { AppointmentsModule } from 'src/appointments/appointments.module'
import { InsuranceService } from 'src/insurance/insurance.service'

@Module({
  imports: [HttpModule, ConfigModule, ClinicsModule, AppointmentsModule],
  providers: [PatientService, ClinicConfigService, InsuranceService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
