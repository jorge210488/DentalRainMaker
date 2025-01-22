import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsArray,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

class EmailAddressDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'user@example.com',
  })
  address: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Tipo de correo electrónico (ej. HOME, WORK, OTHER)',
    example: 'OTHER',
    required: false,
  })
  type?: string
}

export class CreatePatientDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El nombre debe tener entre 3 y 50 caracteres',
  })
  @ApiProperty({
    description: 'El primer nombre del usuario',
    example: 'Javier',
  })
  given_name: string

  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El apellido debe tener entre 3 y 50 caracteres',
  })
  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Peralta',
  })
  family_name: string

  @IsOptional()
  @IsString({ message: 'El tipo de usuario debe ser una cadena de texto' })
  @IsEnum(['ADMIN', 'EMPLOYEE', 'PATIENT'], {
    message: 'El tipo de usuario debe ser ADMIN, EMPLOYEE o PATIENT',
  })
  @ApiProperty({
    description: 'El tipo de usuario (ADMIN, EMPLOYEE o PATIENT)',
    example: 'PATIENT',
    default: 'PATIENT',
  })
  type: string = 'PATIENT'

  @IsNotEmpty({
    message: 'La lista de correos electrónicos no puede estar vacía',
  })
  @IsArray({ message: 'Debe proporcionar una lista de correos electrónicos' })
  @ValidateNested({ each: true })
  @Type(() => EmailAddressDTO)
  @ApiProperty({
    description: 'Lista de correos electrónicos del usuario',
    example: [{ address: 'javierp@email.com', type: 'OTHER' }],
  })
  email_addresses: EmailAddressDTO[]
}
