import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, Validate, IsUUID } from 'class-validator'
import { isMobilePhone } from 'validator'

export class SendSmsDto {
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
    example: 'Dental Rainmaker Clinic',
    description: 'Nombre de la clínica',
  })
  @IsString()
  clinic_name: string

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number to send the SMS to.',
  })
  @IsString()
  @Validate((value: string) => isMobilePhone(value, 'any'), {
    message: 'The phone number must be a valid mobile number.',
  })
  to: string

  @ApiProperty({
    example: 'Hello! This is a test message.',
    description: 'The body of the SMS (maximum 160 characters).',
    maxLength: 160,
  })
  @IsString()
  @MaxLength(160, { message: 'SMS body cannot exceed 160 characters.' })
  body: string
}
