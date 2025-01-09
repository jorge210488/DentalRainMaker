import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsObject,
  IsEnum,
  IsISO8601,
} from 'class-validator'
import { NotificationType } from '../enums/notifications.enum'

export class CreateNotificationDto {
  @ApiProperty({
    example: 'PROMOTIONAL',
    description: 'Tipo de notificación',
    enum: NotificationType,
  })
  @IsEnum(NotificationType)
  type: NotificationType

  @ApiProperty({
    example: '¡Descuento en blanqueamiento dental!',
    description: 'Título de la notificación',
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'Aprovecha un 20% de descuento en blanqueamiento dental este mes.',
    description: 'Contenido del cuerpo de la notificación',
  })
  @IsString()
  body: string

  @ApiProperty({
    example: { key1: 'value1', key2: 'value2' },
    description:
      'Datos adicionales para personalizar la notificación (opcional)',
    required: false,
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, string>

  @ApiProperty({
    example: '12345',
    description: 'ID del usuario al que pertenece la notificación',
  })
  @IsString()
  userId: string

  @ApiProperty({
    example: '2025-01-10T10:00:00.000Z',
    description:
      'Fecha y hora programada para el envío de la notificación (opcional). Si no se proporciona, se enviará inmediatamente.',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  sendAt?: string
}
