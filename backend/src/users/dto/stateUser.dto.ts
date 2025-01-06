import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class StateUserDto {
  @IsNotEmpty({ message: 'The state field cannot be blank' })
  @IsString({ message: 'The state field must be a string of text' })
  @IsIn(['ACTIVE', 'INACTIVE', 'DECEASED'])
  @ApiProperty({
    description:
      'The state field must be a string of text and only ACTIVE, INACTIVE or DECEASED',
    example: 'INACTIVE',
    required: true,
  })
  state: string
}
