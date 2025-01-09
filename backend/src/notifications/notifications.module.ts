import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceToken, DeviceTokenSchema } from './schemas/deviceToken.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { Notification, NotificationSchema } from './schemas/notification.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceToken.name, schema: DeviceTokenSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [NotificationsService, FirebaseAdmin],
  controllers: [NotificationsController],
  exports: [FirebaseAdmin, NotificationsService],
})
export class NotificationsModule {}
