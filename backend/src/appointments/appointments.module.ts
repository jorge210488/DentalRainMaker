import { Module } from '@nestjs/common'

import { MongooseModule } from '@nestjs/mongoose'

import { ClinicsModule } from '../clinics/clinics.module'
import { Appointment, AppointmentSchema } from './schemas/appointment.schema'
import {
  AppointmentType,
  AppointmentTypeSchema,
} from 'src/appointmentsType/schemas/appointmentType.schema'
import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { UsersModule } from 'src/users/users.module'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: AppointmentType.name, schema: AppointmentTypeSchema },
    ]),
    ClinicsModule,
    UsersModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClinicConfigService],
  exports: [AppointmentsService, MongooseModule],
})
export class AppointmentsModule {}
