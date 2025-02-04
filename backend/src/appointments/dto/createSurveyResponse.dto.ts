import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSurveyResponseDto {
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'Unique identifier for the appointment.',
  })
  appointment_id: string

  @IsString()
  @ApiProperty({
    example: '0987654321',
    description: 'Unique identifier for the clinic.',
  })
  clinic_id: string

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description: 'Overall satisfaction rating (1-5).',
  })
  satisfaction: number

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 4,
    description: 'Rating for waiting time (1-5).',
  })
  waiting_time: number

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description: 'Rating for clinic cleanliness and comfort (1-5).',
  })
  cleanliness: number

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 4,
    description: 'Rating for staff friendliness and professionalism (1-5).',
  })
  staff_friendly: number

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description:
      'Rating for how well the doctor explained the condition (1-5).',
  })
  doctor_explanation: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 3,
    description: 'Rating for how well the doctor listened to concerns (1-5).',
    required: false,
  })
  doctor_listened?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 4,
    description: 'Would you recommend this doctor to others? (1-5).',
    required: false,
  })
  recommend_doctor?: number

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Great service and friendly staff!',
    description: 'Additional feedback comments from the patient.',
    required: false,
  })
  feedback_comments?: string
}
