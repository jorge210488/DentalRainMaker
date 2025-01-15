import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsObject,
  IsEnum,
  IsISO8601,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { NotificationType } from '../enums/notifications.enum'

// DTO para el campo 'notification'
class NotificationContentDto {
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

  @ApiPropertyOptional({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJc18Ihn9RZ_3II5khLLon39Sydu880MovUQ&s',
    description: 'Imagen a mostrar en la notificación (opcional)',
  })
  @IsString()
  @IsOptional()
  image?: string =
    'https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png'
}

// DTO para el campo 'data'
class NotificationDataDto {
  @ApiProperty({
    example: 'REMINDER',
    description: 'Tipo de notificación',
    enum: NotificationType,
  })
  @IsEnum(NotificationType)
  type: NotificationType

  @ApiProperty({
    example: '/promotions/123',
    description: 'Ruta asociada a la notificación (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    example: 'DENTAL20',
    description: 'Código promocional asociado a la notificación (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  promoCode?: string

  @ApiProperty({
    example: '987654321',
    description: 'ID de la cita asociada a la notificación (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  appointmentId?: string
}

// DTO para el campo 'webpush.fcm_options'
class WebpushFcmOptionsDto {
  @ApiPropertyOptional({
    example: 'https://dental-rain-maker.vercel.app/',
    description:
      'Enlace que se abrirá al hacer clic en la notificación (opcional)',
  })
  @IsString()
  @IsOptional()
  link?: string = 'https://dental-rain-maker.vercel.app/'
}

class WebpushDto {
  @ApiProperty({
    type: WebpushFcmOptionsDto,
    description: 'Opciones específicas de FCM para webpush',
  })
  @ValidateNested()
  @Type(() => WebpushFcmOptionsDto)
  fcm_options: WebpushFcmOptionsDto
}

export class CreateNotificationDto {
  @ApiProperty({
    type: NotificationContentDto,
    description: 'Información principal de la notificación',
  })
  @ValidateNested()
  @Type(() => NotificationContentDto)
  notification: NotificationContentDto

  @ApiProperty({
    example: '12345',
    description: 'ID del usuario al que pertenece la notificación',
  })
  @IsString()
  userId: string

  @ApiProperty({
    type: NotificationDataDto,
    description: 'Datos adicionales para personalizar la notificación',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationDataDto)
  data?: NotificationDataDto

  @ApiPropertyOptional({
    type: WebpushDto,
    description: 'Configuraciones de webpush (opcional)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WebpushDto)
  webpush?: WebpushDto

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
