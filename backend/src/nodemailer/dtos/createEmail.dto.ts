import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsISO8601,
  IsUUID,
  IsEmail,
} from 'class-validator'

export class CreateEmailDto {
  @ApiProperty({
    example: '804',
    description: 'ID del usuario al que pertenece el correo',
  })
  @IsString()
  remote_id: string

  @ApiProperty({
    example: 'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306',
    description: 'Identificador de la clínica en formato UUID',
  })
  @IsString({ message: 'El clinic_id debe ser una cadena de texto' })
  @IsUUID(4, { message: 'clinic_id debe estar en formato UUID' })
  clinic_id: string

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del destinatario',
  })
  @IsEmail({}, { message: 'El campo to debe ser un correo electrónico válido' })
  to: string

  @ApiProperty({
    example: 'Appointment Reminder',
    description: 'Asunto del correo',
  })
  @IsString()
  subject: string

  @ApiPropertyOptional({
    example: 'Hello',
    description: 'Saludo para el usuario',
  })
  @IsOptional()
  @IsString()
  greetings: string

  @ApiProperty({
    example: 'Jorge',
    description: 'Nombre del usuario',
  })
  @IsString()
  given_name: string

  @ApiProperty({
    example: 'Dental Rainmaker Clinic',
    description: 'Nombre de la clínica',
  })
  @IsString()
  clinic_name: string

  @ApiProperty({
    example: 'Your appointment is scheduled for tomorrow at 3:00 PM.',
    description: 'Cuerpo principal del correo',
  })
  @IsString()
  body: string

  @ApiPropertyOptional({
    example: 'https://example.com/details',
    description: 'Enlace para más detalles (opcional)',
  })
  @IsOptional()
  @IsString()
  link?: string

  @ApiPropertyOptional({
    example: 'Best regards',
    description: 'Despedida del correo',
  })
  @IsOptional()
  @IsString()
  closing: string

  @ApiPropertyOptional({
    example: 'Dental Rain Maker Team',
    description: 'Firma del correo',
  })
  @IsOptional()
  @IsString()
  signature?: string

  @ApiPropertyOptional({
    example: '2025-01-10T10:00:00.000Z',
    description: 'Fecha y hora programada para el envío del correo',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  sendAt?: string
}
