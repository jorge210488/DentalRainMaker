import { Transform } from 'class-transformer'
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSurveyResponseDto {
  @IsString()
  @ApiProperty({ example: '1234567890', description: 'Appointment ID' })
  appointment_id: string

  @IsString()
  @ApiProperty({ example: '0987654321', description: 'Clinic ID' })
  clinic_id: string

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 5, description: 'Overall satisfaction rating (1-5)' })
  satisfaction: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 4, description: 'Waiting time rating (1-5)' })
  waiting_time: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 5, description: 'Cleanliness rating (1-5)' })
  cleanliness: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description: 'Friendliness of staff rating (1-5)',
  })
  staff_friendly: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 4, description: 'Doctor’s explanation rating (1-5)' })
  doctor_explanation: number

  @Transform(({ value }) => (value ? parseInt(value, 10) : null))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 3,
    description: 'Did the doctor listen to concerns? (1-5)',
    required: false,
  })
  doctor_listened: number

  @Transform(({ value }) => (value ? parseInt(value, 10) : null))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description: 'Would recommend doctor? (1-5)',
    required: false,
  })
  recommend_doctor: number

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Great service!',
    description: 'Additional comments',
    required: false,
  })
  feedback_comments?: string
}
