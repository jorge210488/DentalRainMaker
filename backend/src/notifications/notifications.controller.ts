import { Controller, Post, Body, Put, Param, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { CreateNotificationDto } from './dtos/createNotification.dto'
import { UpdateNotificationDto } from './dtos/updateNotification.dto'
import { Notification } from './schemas/notification.schema'

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Guardar o actualizar token de dispositivo' })
  @Post('save')
  async saveDeviceToken(
    @Body() { userId, token }: { userId: string; token: string },
  ): Promise<void> {
    await this.notificationsService.saveDeviceToken(userId, token)
  }

  @ApiOperation({ summary: 'Send a new push notification' })
  @Post('send')
  async sendNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<void> {
    console.log('NotificationsController: Received DTO', createNotificationDto)

    // Enviar notificación push
    await this.notificationsService.sendPushNotification(createNotificationDto)

    // Guardar en la base de datos como notificación enviada
    await this.notificationsService.createNotification(
      createNotificationDto,
      true,
    )
  }

  // Guardar notificación en la base de datos sin enviar (Para pruebas Backend)
  @ApiOperation({ summary: 'Create a new notification in the database' })
  @Post('create')
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    console.log(
      'NotificationsController: Creating new notification',
      createNotificationDto,
    )

    return this.notificationsService.createNotification(
      createNotificationDto,
      false,
    )
  }

  @ApiOperation({ summary: 'Update an existing notification' })
  @Put(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    console.log(
      `NotificationsController: Updating notification with ID ${id}`,
      updateNotificationDto,
    )

    return this.notificationsService.updateNotification(
      id,
      updateNotificationDto,
    )
  }
}
