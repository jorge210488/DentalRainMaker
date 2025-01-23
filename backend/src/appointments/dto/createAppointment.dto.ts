import {
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  IsRFC3339,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class ProviderDTO {
  @IsString()
  @ApiProperty({
    example: 'resources/provider_1',
    description: 'Name of the provider.',
  })
  name: string

  @IsString()
  @ApiProperty({
    example: 'provider_1',
    description: 'Remote ID of the provider.',
  })
  remote_id: string

  @IsString()
  @ApiProperty({ example: 'PROVIDER', description: 'Type of the provider.' })
  type: string
}

class SchedulerDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Name of the scheduler.',
    required: false,
  })
  name?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '123',
    description: 'Remote ID of the scheduler.',
    required: false,
  })
  remote_id?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'room',
    description: 'Type of the scheduler.',
    required: false,
  })
  type?: string
}

export class CreateAppointmentDto {
  @IsString()
  @ApiProperty({
    example: '804',
    description: 'Contact ID associated with the appointment.',
  })
  contact_id: string

  @IsString()
  @ApiProperty({
    example: '2025-02-14 10:00:00',
    description:
      'Start time of the appointment in the local timezone (yyyy-mm-dd hh:mm:ss format).',
  })
  wall_start_time: string

  @IsString()
  @ApiProperty({
    example: '2025-02-14 11:00:00',
    description:
      'End time of the appointment in the local timezone (yyyy-mm-dd hh:mm:ss format).',
  })
  wall_end_time: string

  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    example: [
      {
        name: 'resources/provider_1',
        remote_id: 'provider_1',
        type: 'PROVIDER',
      },
    ],
    description: 'List of providers associated with the appointment.',
  })
  providers: ProviderDTO[]

  @IsOptional()
  @IsObject()
  @ApiProperty({
    example: {
      name: 'Jane Scheduler',
      remote_id: '123',
      type: 'room',
    },
    description: 'Scheduler information for the appointment.',
    required: false,
  })
  scheduler?: SchedulerDTO

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'appointmenttypes/1',
    description: 'Appointment type ID.',
    required: false,
  })
  appointment_type_id?: string

  @IsString()
  @ApiProperty({
    example: 'resources/operatory_5',
    description: 'Operatory associated with the appointment.',
  })
  operatory: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Routine check-up',
    description: 'Short description of the appointment.',
    required: false,
  })
  short_description?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Patient needs a follow-up on previous treatment.',
    description: 'Notes about the appointment.',
    required: false,
  })
  notes?: string
}
