import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'
import {
  Appointment,
  AppointmentSchema,
} from '../appointments/schemas/appointment.schema'
import { NotificationsModule } from '../notifications/notifications.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ContactsModule } from 'src/contacts/contacts.module'
import { Clinic, ClinicSchema } from 'src/clinics/schemas/clinic.schema'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Clinic.name, schema: ClinicSchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    NotificationsModule,
    ContactsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
