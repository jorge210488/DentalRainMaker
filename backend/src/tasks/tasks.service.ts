import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../users/schemas/user.schema'
import { NotificationsService } from '../notifications/notifications.service'
import { CreateNotificationDto } from '../notifications/dtos/createNotification.dto'
import { NotificationType } from '../notifications/enums/notifications.enum'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea que se ejecuta a medianoche
  async executeProfileCompletionTask(): Promise<void> {
    this.logger.log('Executing profile completion task...')

    // Buscar usuarios con perfil incompleto
    const usersWithIncompleteProfiles = await this.userModel.find({
      $or: [
        { addresses: { $size: 0 } },
        { phone_numbers: { $size: 0 } },
        { email_addresses: { $size: 0 } },
        { gender: { $exists: false } },
        { birth_date: { $exists: false } },
        { img_url: { $exists: false } },
        { preferred_name: { $exists: false } },
        { notes: { $exists: false } },
      ],
    })

    if (!usersWithIncompleteProfiles.length) {
      this.logger.log('No users with incomplete profiles found.')
      return
    }

    this.logger.log(
      `Found ${usersWithIncompleteProfiles.length} users with incomplete profiles.`,
    )

    // Crear y enviar notificaciones
    for (const user of usersWithIncompleteProfiles) {
      const notificationDto: CreateNotificationDto = {
        userId: user._id,
        type: NotificationType.REMINDER,
        title: 'Complete your profile!',
        body: 'Your profile is incomplete. Please update it to enjoy full features.',
        data: { action: 'profile_completion' },
      }

      try {
        await this.notificationsService.sendPushNotification(notificationDto)
        await this.notificationsService.createNotification(
          notificationDto,
          true,
        )
        this.logger.log(`Notification sent to user ${user._id}`)
      } catch (error) {
        this.logger.error(
          `Failed to send notification to user ${user._id}: ${error.message}`,
        )
      }
    }

    this.logger.log('Profile completion task completed.')
  }
}
