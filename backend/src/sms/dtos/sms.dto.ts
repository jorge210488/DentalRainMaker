import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, Validate } from 'class-validator'
import { isMobilePhone } from 'validator'

export class SendSmsDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number to send the SMS to.',
  })
  @IsString()
  @Validate((value: string) => isMobilePhone(value, 'any'), {
    message: 'The phone number must be a valid mobile number.',
  })
  to: string

  @ApiProperty({
    example: 'Hello! This is a test message.',
    description: 'The body of the SMS (maximum 160 characters).',
    maxLength: 160,
  })
  @IsString()
  @MaxLength(160, { message: 'SMS body cannot exceed 160 characters.' })
  body: string
}
