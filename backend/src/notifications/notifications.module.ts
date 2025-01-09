import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceToken, DeviceTokenSchema } from './schemas/deviceToken.schema'
import { User, UserSchema } from '../users/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceToken.name, schema: DeviceTokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [NotificationsService, FirebaseAdmin],
  controllers: [NotificationsController],
  exports: [FirebaseAdmin],
})
export class NotificationsModule {}
