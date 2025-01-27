import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { FirebaseAdmin } from '../config/firebaseAdmin'
import { CreateNotificationDto } from './dtos/createNotification.dto'
import { UpdateNotificationDto } from './dtos/updateNotification.dto'
import { Notification } from './schemas/notification.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DeviceToken } from './schemas/deviceToken.schema'
import { ContactsService } from '../contacts/contacts.service'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly firebaseAdmin: FirebaseAdmin,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    @InjectModel(DeviceToken.name)
    private readonly deviceTokenModel: Model<DeviceToken>,
    private readonly contactsService: ContactsService,
  ) {}

  async saveDeviceToken(
    remoteId: string,
    clinicId: string,
    token: string,
  ): Promise<void> {
    if (!remoteId || !token || !clinicId) {
      throw new BadRequestException(
        'Remote ID, Clinic ID, and token are required',
      )
    }

    const contact = await this.contactsService.getContactById(
      clinicId,
      remoteId,
    )

    if (!contact) {
      throw new NotFoundException(
        `Contact with remoteId ${remoteId} not found in clinic ${clinicId}`,
      )
    }

    const existingToken = await this.deviceTokenModel.findOne({ token })

    if (existingToken) {
      console.log('DeviceTokenService: Token already exists')
      return
    }

    await this.deviceTokenModel.create({
      remote_id: remoteId,
      clinic_id: clinicId,
      token,
    })

    console.log(
      'DeviceTokenService: Token saved successfully for the remoteId and clinicId',
    )
  }

  async sendPushNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<void> {
    const { clinic_id, remote_id, notification, data, webpush } =
      notificationDto

    const { title, body, image } = notification
    const link =
      webpush?.fcm_options?.link || 'https://dental-rain-maker.vercel.app/'

    // Verificar que `data.type` sea válido
    if (!data || !data.type) {
      throw new BadRequestException('Notification type is required in data')
    }

    // Buscar todos los tokens asociados al userId
    const deviceTokens = await this.deviceTokenModel.find({
      remote_id,
      clinic_id,
    })

    if (!deviceTokens.length) {
      console.error(`No device tokens found for userId ${remote_id}`)
      throw new NotFoundException(
        `No device tokens found for user ${remote_id}`,
      )
    }

    console.log(
      `Found ${deviceTokens.length} device tokens for userId ${remote_id}`,
      deviceTokens,
    )

    for (const { token } of deviceTokens) {
      try {
        const message = {
          notification: {
            title,
            body,
            image,
          },
          webpush: {
            fcmOptions: {
              link, // El enlace ahora está correctamente configurado
            },
          },
          token,
        }

        console.log('Asi envio el mensaje a firebaseAdmin', message)

        const response = await this.firebaseAdmin
          .getAdminInstance()
          .messaging()
          .send(message)

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
    const notificationToSave = new this.notificationModel({
      ...notificationDto,
      isSent,
    })

    console.log(
      'NotificationsService: Saving notification to database',
      notificationToSave,
    )

    return notificationToSave.save()
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
