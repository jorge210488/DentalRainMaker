import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateClinicDto {
  @ApiProperty({
    description: 'Name of the clinic',
    example: 'Sunny Health Center',
  })
  @IsNotEmpty()
  @IsString()
  clinic_name: string

  @ApiProperty({
    description: 'Website of the clinic (optional)',
    example: 'https://www.sunnyhealthcenter.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  clinic_website?: string
}
