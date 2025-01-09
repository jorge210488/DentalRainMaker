import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import { CreateNotificationDto } from './createNotification.dto'

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({
    example: true,
    description: 'Indica si la notificación ha sido leída',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean
}
