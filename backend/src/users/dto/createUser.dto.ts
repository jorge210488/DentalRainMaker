import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    IsBoolean,
    IsArray,
    IsObject,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  class AddressDTO {
    @IsString()
    street_address: string;
  
    @IsString()
    city: string;
  
    @IsString()
    state: string;
  
    @IsString()
    postal_code: string;
  
    @IsString()
    country_code: string;
  
    @IsString()
    type: string;
  }
  
  export class CreateUserDto {
    @IsNotEmpty({ message: 'This field cannot be blank' })
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text',
      example: 'Jhon Wayne',
      required: true,
    })
    name: string;

    @IsNotEmpty({ message: 'This field cannot be blank' })
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text and only PATIENT, EMPLOYEE, ADMIN',
      example: 'PATIENT',
      required: true,
    })
    type: string;

    @IsNotEmpty({ message: 'This field cannot be blank' })
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text',
      example: 'Jhon',
      required: true,
    })
    given_name: string;


    @IsNotEmpty({ message: 'This field cannot be blank' })
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text',
      example: 'Wayne',
      required: true,
    })
    family_name: string;


    @IsOptional()
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text',
      example: 'Jhon',
      required: false,
    })
    preferred_name?: string;
  
    
    @IsOptional()
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text and only MALE, FEMALE or OTHER',
      example: 'MALE',
      required: false,
    })
    gender?: string;
  

    @IsOptional()
    @IsString({ message: 'This field must be a string' })
    @ApiProperty({
      description:
        'This field must be a string',
      example: '1/1/1980',
      required: false,
    })
    birth_date?: string;

    
    @IsOptional()
    @IsString({ message: 'This field must be a string of text' })
    @ApiProperty({
      description:
        'This field must be a string of text',
      example: 'Aditional notes',
      required: false,
    })
    notes?: string;


    
    @IsOptional()
    @IsArray()
    @IsObject({each:true})
    @ApiProperty({
      description:
        'List of adresses for the user',
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
    addresses?: AddressDTO[];
  }