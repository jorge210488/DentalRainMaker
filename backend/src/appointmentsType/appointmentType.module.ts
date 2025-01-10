import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  AppointmentType,
  AppointmentTypeSchema,
} from './schemas/appointmentType.schema'
import { AppointmentTypeController } from './appointmentType.controller'
import { AppointmentTypeService } from './appointmentType.service'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppointmentType.name, schema: AppointmentTypeSchema },
    ]),
    UsersModule,
  ],
  controllers: [AppointmentTypeController],
  providers: [AppointmentTypeService],
  exports: [AppointmentTypeService, MongooseModule],
})
export class AppointmentTypeModule {}
