import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBrevoContactDto {
  @ApiProperty({
    description: 'First name of the contact',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  given_name: string

  @ApiProperty({
    description: 'Last name of the contact',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  family_name: string

  @ApiProperty({
    description: 'Primary email address of the contact',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  primary_email_address: string

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string

  @ApiProperty({
    description: 'Clinic ID to find the associated company in Brevo',
    example: 'e532e9e5-5203-4695-9777-3e319943e431',
  })
  @IsNotEmpty()
  @IsString()
  clinic_id: string
}
