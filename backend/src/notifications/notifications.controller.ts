import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { CreateNotificationDto } from './dtos/createNotification.dto'

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Send a new notification' })
  @Post('send')
  async sendNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<void> {
    console.log('NotificationsController: Received DTO', createNotificationDto)
    await this.notificationsService.sendPushNotification(createNotificationDto)
  }
}
