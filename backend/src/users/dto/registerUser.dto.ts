import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsArray,
  IsObject,
} from 'class-validator'
import { Credential } from '../../auth/schemas/credential.schema'
import { ApiProperty } from '@nestjs/swagger'

class AddressDTO {
  @IsString()
  street_address: string

  @IsString()
  city: string

  @IsString()
  state: string

  @IsString()
  postal_code: string

  @IsString()
  country_code: string

  @IsString()
  type: string
}

class Phone_NumberDTO {
  @IsString()
  number: string

  @IsString()
  type: string
}

class Email_AddressDTO {
  @IsString()
  address: string

  @IsString()
  type: string
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'The field name cannot be blank' })
  @IsString({ message: 'The field name must be a string of text' })
  @ApiProperty({
    description: 'The field name must be a string of text',
    example: 'Jhon Wayne',
    required: true,
  })
  name: string

  @IsNotEmpty({ message: 'The field type cannot be blank' })
  @IsString({ message: 'The field type must be a string of text' })
  @ApiProperty({
    description:
      'The field type must be a string of text and only PATIENT, EMPLOYEE, ADMIN',
    example: 'PATIENT',
    required: true,
  })
  type: string

  @IsNotEmpty({ message: 'The field given_name cannot be blank' })
  @IsString({ message: 'The field given_name must be a string of text' })
  @ApiProperty({
    description: 'The field given_name must be a string of text',
    example: 'Jhon',
    required: true,
  })
  given_name: string

  @IsNotEmpty({ message: 'The field family_name cannot be blank' })
  @IsString({ message: 'The field family_name must be a string of text' })
  @ApiProperty({
    description: 'The field family_name must be a string of text',
    example: 'Wayne',
    required: true,
  })
  family_name: string

  @IsOptional()
  @IsString({ message: 'The field preferred_name must be a string of text' })
  @ApiProperty({
    description: 'The field preferred_name must be a string of text',
    example: 'Jhon',
    required: false,
  })
  preferred_name?: string

  @IsOptional()
  @IsString({ message: 'The gender field must be a string of text' })
  @ApiProperty({
    description:
      'The gender field must be a string of text and only MALE, FEMALE or OTHER',
    example: 'MALE',
    required: false,
  })
  gender?: string

  @IsOptional()
  @IsString({ message: 'The birth_date field must be a string' })
  @ApiProperty({
    description: 'The birth_date field must be a string',
    example: '1/1/1980',
    required: false,
  })
  birth_date?: string

  @IsOptional()
  @IsString({ message: 'The notes field must be a string of text' })
  @ApiProperty({
    description: 'The notes field must be a string of text',
    example: 'Aditional notes',
    required: false,
  })
  notes?: string

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    description: 'List of adresses for the user',
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
    description: 'List of phone numbers for the user',
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
  @IsString({ message: 'The primary_phone_number field must be a string' })
  @ApiProperty({
    description: 'The primary_phone_number field must be a string',
    example: '123456789',
    required: false,
  })
  primary_phone_number?: string

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    description: 'List of email addresses for the user',
    example: [
      {
        number: '123456789',
        type: 'mobile',
      },
    ],
    required: false,
  })
  email_addresses?: Email_AddressDTO[]

  @IsNotEmpty({ message: 'The primary_email_address field cannot be blank' })
  @IsString({
    message: 'The primary_email_address field must be a string of text',
  })
  @ApiProperty({
    description: 'The primary_email_address field must be a string of text',
    example: 'jwayne@gmail.com',
    required: true,
  })
  primary_email_address: string

  @IsNotEmpty({ message: 'The state field cannot be blank' })
  @IsString({ message: 'The state field must be a string of text' })
  @ApiProperty({
    description:
      'The state field must be a string of text and only ACTIVE, INACTIVE or DECEASED',
    example: 'INACTIVE',
    required: true,
  })
  state: string

  @IsNotEmpty({ message: 'The credential field cannot be blank' })
  @IsString({ message: 'The credential field must be a string of text' })
  @ApiProperty({
    description: 'The credential field must be a string of text',
    example: 'jwayne@gmail.com',
    required: true,
  })
  credential: Credential
}
