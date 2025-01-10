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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: AppointmentType.name, schema: AppointmentTypeSchema },
    ]),
    ClinicsModule,
    UsersModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService, MongooseModule],
})
export class AppointmentsModule {}
