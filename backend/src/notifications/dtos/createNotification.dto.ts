import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsObject } from 'class-validator'

export class CreateNotificationDto {
  @ApiProperty({
    example: 'DEVICE_FCM_TOKEN_HERE',
    description: 'FCM token of the device to send the notification',
  })
  @IsString()
  token: string

  @ApiProperty({
    example: 'Test Notification',
    description: 'Title of the notification',
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'This is a test notification',
    description: 'Body content of the notification',
  })
  @IsString()
  body: string

  @ApiProperty({
    example: { key1: 'value1', key2: 'value2' },
    description: 'Additional data to send with the notification',
    required: false,
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, string>
}
