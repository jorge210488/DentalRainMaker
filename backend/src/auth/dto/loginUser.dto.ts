import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({
    description: 'User email, required for all authentication methods',
    example: 'jorge@email.com',
  })
  email: string

  @IsNotEmpty({ message: 'Provider is required' })
  @IsString({ message: 'Provider must be a string' })
  @ApiProperty({
    description: 'Authentication provider, e.g., local, google, facebook',
    example: 'google',
  })
  provider: string

  @ValidateIf((o) => o.provider !== 'local')
  @IsNotEmpty({ message: 'Provider ID is required for third-party providers' })
  @IsString({ message: 'Provider ID must be a string' })
  @ApiProperty({
    description:
      'Unique identifier provided by the authentication provider, required only if provider is not local',
    example: '1234567890abcdef',
    required: false,
  })
  providerId?: string

  @ValidateIf((o) => o.provider === 'local')
  @IsNotEmpty({ message: 'Password is required for local provider' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 15, {
    message: 'Password must be between 8 and 15 characters',
  })
  @ApiProperty({
    description:
      'Password, required only if provider is local. Must meet security requirements.',
    example: 'Prueba123!',
    required: false,
  })
  password?: string
}
