import { PartialType } from '@nestjs/mapped-types'
import { CreateAppointmentDto } from './createAppointment.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2025-02-14 15:00:00',
    description:
      'Start time of the appointment in the local timezone (yyyy-mm-dd hh:mm:ss format).',
    required: false,
  })
  wall_start_time?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2025-02-14 16:00:00',
    description:
      'End time of the appointment in the local timezone (yyyy-mm-dd hh:mm:ss format).',
    required: false,
  })
  wall_end_time?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'resources/operatory_5',
    description: 'Operatory associated with the appointment.',
    required: false,
  })
  operatory?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Patient needs a follow-up on previous treatment.',
    description: 'Notes about the appointment.',
    required: false,
  })
  notes?: string
}
