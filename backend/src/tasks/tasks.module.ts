import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { NotificationsModule } from '../notifications/notifications.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
