import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PatientController } from './patients.controller';
import { PatientService } from './patients.service';
import { ConfigModule } from '@nestjs/config';
import { ClinicConfigService } from 'src/config/clinicsConfig.service';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { AppointmentsService } from 'src/appointments/appointments.service';


@Module({
  imports: [HttpModule, ConfigModule, ClinicsModule],
  providers: [PatientService, ClinicConfigService, AppointmentsService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
