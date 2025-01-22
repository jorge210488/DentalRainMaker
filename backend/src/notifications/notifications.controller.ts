import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common'
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
    @Body()
    {
      remoteId,
      clinicId,
      token,
    }: {
      remoteId: string
      clinicId: string
      token: string
    },
  ): Promise<void> {
    console.log('Received in body:', { remoteId, clinicId, token })
    await this.notificationsService.saveDeviceToken(remoteId, clinicId, token)
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

  @ApiOperation({
    summary: 'Get notifications by user remote_id and clinic_id',
  })
  @Get('user/:remoteId')
  async getNotificationsByUser(
    @Param('remoteId') remoteId: string,
    @Query('clinic_id') clinicId: string,
  ): Promise<Notification[]> {
    console.log(
      `NotificationsController: Fetching notifications for user ${remoteId} and clinic ${clinicId}`,
    )
    return this.notificationsService.getNotificationsByUser(remoteId, clinicId)
  }
}
