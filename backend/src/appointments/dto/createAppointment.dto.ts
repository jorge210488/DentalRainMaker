import {
  IsObject,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsArray,
  IsBoolean,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Unique identifier for the appointment',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsOptional()
  _id?: string

  @ApiProperty({
    description: 'Name of the appointment',
    example: 'Consultation with Dr. Smith',
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'Remote identifier for external systems (optional)',
    example: '123456',
  })
  @IsString()
  @IsOptional()
  remote_id?: string

  @ApiProperty({
    description: 'ID of the contact associated with this appointment',
    example: '61b7d88a78989f2b1c5e4d23',
  })
  @IsString()
  @IsNotEmpty()
  contact_id: string

  @ApiProperty({
    description: 'Detailed contact information (optional)',
    example: {
      name: 'John Doe',
      remote_id: 'remote123',
      given_name: 'John',
      family_name: 'Doe',
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  contact?: {
    name: string
    remote_id: string
    given_name: string
    family_name: string
  }

  @ApiProperty({
    description: 'Location of the appointment',
    example: '123 Main Street, Suite 200',
  })
  @IsString()
  @IsNotEmpty()
  location: string

  @ApiProperty({
    description: 'Start time of the appointment',
    example: '2025-01-08T09:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_time: Date

  @ApiProperty({
    description: 'End time of the appointment',
    example: '2025-01-08T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_time?: Date

  @ApiProperty({
    description: 'Wall start time of the appointment (optional)',
    example: '2025-01-08T09:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  wall_start_time?: Date

  @ApiProperty({
    description: 'Wall end time of the appointment (optional)',
    example: '2025-01-08T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  wall_end_time?: Date

  @ApiProperty({
    description: 'Time zone of the appointment (optional)',
    example: 'America/New_York',
  })
  @IsString()
  @IsOptional()
  time_zone?: string

  @ApiProperty({
    description: 'List of providers associated with the appointment (optional)',
    example: [
      {
        name: 'Dr. Smith',
        remote_id: 'provider123',
        type: 'doctor',
        display_name: 'Dr. John Smith',
      },
    ],
  })
  @IsArray()
  @IsOptional()
  providers?: Array<{
    name: string
    remote_id: string
    type: string
    display_name: string
  }>

  @ApiProperty({
    description:
      'List of schedulers associated with the appointment (optional)',
    example: [
      {
        name: 'Scheduler 1',
        remote_id: 'scheduler123',
        type: 'scheduler',
        display_name: 'Main Scheduler',
      },
    ],
  })
  @IsArray()
  @IsOptional()
  scheduler?: Array<{
    name: string
    remote_id: string
    type: string
    display_name: string
  }>

  @ApiProperty({
    description: 'ID of the appointment type',
    example: '61b7d88a78989f2b1c5e4d45',
  })
  @IsString()
  @IsNotEmpty()
  appointment_type_id: string

  @ApiProperty({
    description: 'Short description of the appointment',
    example: 'Routine check-up',
  })
  @IsString()
  @IsOptional()
  short_description: string

  @ApiProperty({
    description: 'Additional notes for the appointment',
    example: 'Patient has a history of high blood pressure.',
  })
  @IsString()
  @IsOptional()
  notes: string

  @ApiProperty({
    description: 'Whether the appointment is confirmed',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean

  @ApiProperty({
    description: 'Whether the appointment is cancelled',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  cancelled?: boolean

  @ApiProperty({
    description: 'Whether the appointment is completed',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean

  @ApiProperty({
    description: 'Whether the appointment is marked as broken',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  broken?: boolean


  // @ApiProperty({
  //   description: 'ID of the doctor',
  //   example: '61b7d88a78989f2b1c5e4d45',
  // })
  // @IsString()
  // @IsNotEmpty()
  // doctor_id: string

  // @ApiProperty({
  //   description: 'ID of the clinic',
  //   example: '61b7d88a78989f2b1c5e4d45',
  // })
  // @IsString()
  // @IsNotEmpty()
  // clinic_id: string

  // @ApiProperty({
  //   description: 'Additional data for the appointment',
  //   example: { key: 'value' },
  // })
  // @IsObject()
  // @IsOptional()
  // additional_data: Record<string, unknown>

  @ApiProperty({
    description: 'Additional data for the appointment',
    example: {
      doctor_id: '61b7d88a78989f2b1c5e4d45',
      doctor_name: 'Dr. Smith',
      clinic_id: '61b7d88a78989f2b1c5e4d45',
      clinic_name: 'Main Clinic',
      paid: false,
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  additional_data?: {
    doctor_id: string,
    doctor_name: string,
    clinic_id: string,
    clinic_name: string,
    paid: boolean,
  }


}

  