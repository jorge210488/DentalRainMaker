import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator'

export class CreateAppointmentTypeDto {
  @ApiProperty({
    description: 'Name of the appointment type',
    example: 'Consultation',
  })
  @IsString()
  readonly name: string

  @ApiProperty({
    description: 'Remote ID for the appointment type (optional)',
    example: '12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly remote_id?: string

  @ApiProperty({
    description: 'Display name for the appointment type',
    example: 'General Consultation',
  })
  @IsString()
  readonly display_name: string

  @ApiProperty({
    description: 'List of procedure codes associated with the appointment type',
    example: ['PROC001', 'PROC002'],
  })
  @IsArray()
  readonly procedure_codes: string[]

  @ApiProperty({
    description: 'Length of the appointment (optional)',
    example: '30 minutes',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly appointment_length?: string

  @ApiProperty({
    description: 'Additional data for the appointment type (optional)',
    example: { key1: 'value1', key2: 'value2' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  readonly additional_data?: Record<string, any>
}
