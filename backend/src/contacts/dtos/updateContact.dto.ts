import {
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  IsEnum,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

enum PhoneNumberType {
  MOBILE = 'MOBILE',
  HOME = 'HOME',
  WORK = 'WORK',
  FAX = 'FAX',
  PAGER = 'PAGER',
  OTHER = 'OTHER',
}

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
  @IsEnum(AddressType)
  @ApiProperty({
    example: 'HOME',
    enum: AddressType,
    required: false,
  })
  type?: AddressType
}

class Phone_NumberDTO {
  @IsOptional()
  @IsString()
  number?: string

  @IsOptional()
  @IsEnum(PhoneNumberType)
  @ApiProperty({
    example: 'MOBILE',
    enum: PhoneNumberType,
    required: false,
  })
  type?: PhoneNumberType
}

class Email_AddressDTO {
  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  type?: string
}

class AdditionalDataDTO {
  @IsOptional()
  @IsString()
  ImageFolder?: string
}

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '805', required: false })
  remote_id?: string

  // @IsOptional()
  // @IsString()
  // @ApiProperty({ example: 'Jhon Wayne', required: false })
  // name?: string

  // @IsOptional()
  // @IsString()
  // @ApiProperty({
  //   example: 'PATIENT',
  //   required: false,
  // })
  // type?: string

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
  @IsEnum(['MALE', 'FEMALE', 'GENDER_OTHER'])
  @ApiProperty({
    example: 'GENDER_OTHER',
    enum: ['MALE', 'FEMALE', 'GENDER_OTHER'],
    required: false,
  })
  gender?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '0000-00-00', required: false })
  birth_date?: string

  // @IsOptional()
  // @IsString()
  // @ApiProperty({ example: 'Additional notes', required: false })
  // notes?: string

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
    example: 'jwayne@gmail.com',
    required: false,
  })
  primary_email_address?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'ACTIVE',
    required: false,
  })
  state?: string

  @IsOptional()
  @IsObject()
  @ApiProperty({
    example: {
      ImageFolder: 'martnezjorge805',
    },
    required: false,
  })
  additional_data?: AdditionalDataDTO

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: null,
    required: false,
  })
  preferred_provider?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '0001-01-01', required: false })
  first_visit?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'contacts/805', required: false })
  guarantor?: string

  @IsOptional()
  @ApiProperty({ example: null, required: false })
  opt_ins?: any
}
