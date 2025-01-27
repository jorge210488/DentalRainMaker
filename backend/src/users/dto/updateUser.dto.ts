import { IsOptional, IsString, IsArray, IsObject } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class AddressDTO {
  @IsOptional()
  @IsString()
  street_address?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  state?: string

  @IsOptional()
  @IsString()
  postal_code?: string

  @IsOptional()
  @IsString()
  country_code?: string

  @IsOptional()
  @IsString()
  type?: string
}

class Phone_NumberDTO {
  @IsOptional()
  @IsString()
  number?: string

  @IsOptional()
  @IsString()
  type?: string
}

class Email_AddressDTO {
  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  type?: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Jhon Wayne', required: false })
  name?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'PATIENT',
    required: false,
  })
  type?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Jhon', required: false })
  given_name?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Wayne', required: false })
  family_name?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Jhon', required: false })
  preferred_name?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'MALE',
    required: false,
  })
  gender?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1/1/1980', required: false })
  birth_date?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Additional notes', required: false })
  notes?: string

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    example: [
      {
        street_address: '123 Main St',
        city: 'Springfield',
        state: 'Illinois',
        postal_code: '62701',
        country_code: 'US',
        type: 'home',
      },
    ],
    required: false,
  })
  addresses?: AddressDTO[]

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    example: [
      {
        number: '123456789',
        type: 'mobile',
      },
    ],
    required: false,
  })
  phone_numbers?: Phone_NumberDTO[]

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456789', required: false })
  primary_phone_number?: string

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    example: [
      {
        address: 'jwayne@gmail.com',
        type: 'work',
      },
    ],
    required: false,
  })
  email_addresses?: Email_AddressDTO[]

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'ACTIVE',
    required: false,
  })
  state?: string
}
