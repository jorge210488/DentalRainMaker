import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBrevoCompanyDto {
  @ApiProperty({
    description: 'ID of the clinic in your system',
    example: 'e532e9e5-5203-4695-9777-3e319943e431',
  })
  @IsNotEmpty()
  @IsString()
  clinic_id: string

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
