import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { CreateNotificationDto } from './dtos/createNotification.dto'
import { UpdateNotificationDto } from './dtos/updateNotification.dto'
import { Notification } from './schemas/notification.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DeviceToken } from './schemas/deviceToken.schema'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly firebaseAdmin: FirebaseAdmin,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    @InjectModel(DeviceToken.name)
    private readonly deviceTokenModel: Model<DeviceToken>,
  ) {}

  async saveDeviceToken(userId: string, token: string): Promise<void> {
    if (!userId || !token) {
      throw new BadRequestException('User ID and token are required')
    }

    const existingToken = await this.deviceTokenModel.findOne({ token })

    if (existingToken) {
      console.log('DeviceTokenService: Token already exists')
      return
    }

    await this.deviceTokenModel.updateOne(
      { userId },
      { token },
      { upsert: true },
    )

    console.log('DeviceTokenService: Token saved or updated successfully')
  }

  async sendPushNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<void> {
    const { userId, title, body, data } = notificationDto

    // Buscar todos los tokens asociados al userId
    const deviceTokens = await this.deviceTokenModel.find({ userId })

    if (!deviceTokens.length) {
      console.error(`No device tokens found for userId ${userId}`)
      throw new Error(`No device tokens found for user ${userId}`)
    }

    console.log(
      `Found ${deviceTokens.length} device tokens for userId ${userId}`,
      deviceTokens,
    )

    const message = {
      notification: {
        title,
        body,
      },
      data,
    }

    // Enviar notificación a todos los tokens asociados al usuario
    for (const { token } of deviceTokens) {
      try {
        const response = await this.firebaseAdmin
          .getAdminInstance()
          .messaging()
          .send({ ...message, token })

        console.log(
          `Notification sent successfully to token: ${token}, response: ${response}`,
        )
      } catch (error) {
        console.error(
          `Error sending notification to token: ${token}`,
          error.message,
        )
      }
    }
  }

  async createNotification(
    notificationDto: CreateNotificationDto,
    isSent = false,
  ): Promise<Notification> {
    const { userId, type, title, data, sendAt } = notificationDto

    // Establecer ventana de tiempo de 1 semana atrás
    const timeWindow = new Date()
    timeWindow.setDate(timeWindow.getDate() - 7)

    // Buscar notificación existente en la ventana de tiempo
    const existingNotification = await this.notificationModel.findOne({
      userId,
      type,
      title,
      data,
      sendAt: { $gte: timeWindow },
    })

    if (existingNotification) {
      console.log(
        'NotificationsService: Duplicate notification detected within time window',
        existingNotification,
      )
      throw new ConflictException(
        'Duplicate notification detected within the time window',
      )
    }

    // Crear nueva notificación
    const notification = new this.notificationModel({
      ...notificationDto,
      isSent,
    })

    console.log(
      'NotificationsService: Saving notification to database',
      notification,
    )

    return notification.save()
  }

  async updateNotification(
    id: string,
    updateDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.notificationModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    )

    if (!notification) {
      throw new BadRequestException('Notification not found')
    }

    console.log(
      'NotificationsService: Notification updated successfully',
      notification,
    )

    return notification
  }
}
