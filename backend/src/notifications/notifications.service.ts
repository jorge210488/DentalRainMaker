import { Injectable } from '@nestjs/common'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { CreateNotificationDto } from './dtos/createNotification.dto'

@Injectable()
export class NotificationsService {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async sendPushNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<void> {
    const { token, title, body, data } = notificationDto

    console.log('NotificationsService: Preparing to send notification', {
      token,
      title,
      body,
      data,
    })

    const message = {
      notification: {
        title,
        body,
      },
      token,
      data,
    }

    console.log('NotificationsService: Message constructed', message)

    try {
      const response = await this.firebaseAdmin
        .getAdminInstance()
        .messaging()
        .send(message)

      console.log(
        `NotificationsService: Notification sent successfully, response: ${response}`,
      )
    } catch (error) {
      console.error(
        'NotificationsService: Error sending notification:',
        error.message,
      )
      throw new Error('Failed to send notification')
    }
  }
}
