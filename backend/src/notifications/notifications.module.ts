import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceToken, DeviceTokenSchema } from './schemas/deviceToken.schema'
import { Notification, NotificationSchema } from './schemas/notification.schema'
import { ContactsModule } from 'src/contacts/contacts.module'

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forFeature([
      { name: DeviceToken.name, schema: DeviceTokenSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationsService, FirebaseAdmin],
  controllers: [NotificationsController],
  exports: [FirebaseAdmin, NotificationsService],
})
export class NotificationsModule {}
