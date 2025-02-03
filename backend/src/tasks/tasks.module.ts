import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'
import { NotificationsModule } from '../notifications/notifications.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ContactsModule } from 'src/contacts/contacts.module'
import { Clinic, ClinicSchema } from 'src/clinics/schemas/clinic.schema'
import { AppointmentsModule } from 'src/appointments/appointments.module'
import { NodemailerModule } from 'src/nodemailer/nodemailer.module'
import { SmsModule } from 'src/sms/sms.module'
import { BrevoModule } from 'src/brevo/brevo.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Clinic.name, schema: ClinicSchema },
    ]),
    NotificationsModule,
    ContactsModule,
    AppointmentsModule,
    NodemailerModule,
    SmsModule,
    BrevoModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
