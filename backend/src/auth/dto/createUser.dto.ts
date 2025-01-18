import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidateIf,
  IsArray,
  IsUUID,
} from 'class-validator'
import { MatchPassword } from '../decorators/match.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @Length(3, 80, {
    message: 'El nombre completo debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description:
      'El nombre completo del usuario, es opcional, debe tener entre 3 y 80 caracteres',
    example: 'Jorge Martínez',
  })
  name?: string

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El nombre debe tener entre 3 y 50 caracteres',
  })
  @ApiProperty({
    description:
      'El primer nombre del usuario, no puede estar vacío, debe tener entre 3 y 50 caracteres',
    example: 'Jorge',
  })
  given_name: string

  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El apellido debe tener entre 3 y 50 caracteres',
  })
  @ApiProperty({
    description:
      'El apellido del usuario, no puede estar vacío, debe tener entre 3 y 50 caracteres',
    example: 'Martínez',
  })
  family_name: string

  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @ApiProperty({
    description:
      'El email del usuario, debe tener la estructura válida de un email y no puede estar vacío',
    example: 'jorge@email.com',
  })
  email: string

  @IsOptional()
  @IsString({ message: 'El proveedor debe ser una cadena de texto' })
  @ApiProperty({
    description:
      'El proveedor de autenticación, por ejemplo: local, google, facebook, etc. Si no se especifica, se asume local',
    example: 'google',
  })
  provider: string = 'local'

  @IsOptional()
  @IsString({ message: 'El ID del proveedor debe ser una cadena de texto' })
  @ApiProperty({
    description:
      'El identificador único del proveedor de autenticación, solo se requiere si el proveedor no es local',
    example: '1234567890abcdef',
  })
  providerId?: string

  @ValidateIf((o) => o.provider === 'local')
  @IsNotEmpty({
    message: 'El password no puede estar vacío si el proveedor es local',
  })
  @IsString({ message: 'El password debe ser una cadena de texto' })
  @Length(8, 15, {
    message: 'El password debe tener entre 8 y 15 caracteres',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
    {
      message:
        'El password debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  @ApiProperty({
    description:
      'El password del usuario, no puede estar vacío si el proveedor es local, debe cumplir con los requisitos de seguridad',
    example: 'Prueba123!',
  })
  password?: string

  @ValidateIf((o) => o.provider === 'local')
  @IsNotEmpty({
    message:
      'La confirmación del password no puede estar vacía si el proveedor es local',
  })
  @Validate(MatchPassword, ['password'], {
    message: 'La confirmación del password debe coincidir con el password',
  })
  @ApiProperty({
    description:
      'Debe coincidir con el campo password, es obligatorio si el proveedor es local',
    example: 'Prueba123!',
  })
  confirmPassword?: string

  @IsOptional()
  @IsString({ message: 'El tipo de usuario debe ser una cadena de texto' })
  @ApiProperty({
    description:
      'El tipo de usuario, puede ser ADMIN, EMPLOYEE o PATIENT. Por defecto es PATIENT.',
    example: 'PATIENT',
  })
  type: string = 'PATIENT'

  @IsOptional()
  @IsString({ message: 'El remote_id debe ser una cadena de texto' })
  @ApiProperty({
    description:
      'Un identificador remoto opcional para el usuario en sistemas externos',
    example: 'remote_12345',
  })
  remote_id?: string

  @IsOptional()
  @IsString({ message: 'El clinic_id debe ser una cadena de texto' })
  @IsUUID(4, { each: true })
  @ApiProperty({
    example: 'e532e9e5-5203-4695-9777-3e319943e431',
    description: 'Identificador de la clinica en (UUID format)',
    required: false,
  })
  clinic_id: string
}
