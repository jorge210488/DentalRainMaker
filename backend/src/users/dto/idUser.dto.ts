import { IsNotEmpty, IsMongoId } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class IdUserDto {
  @IsNotEmpty({ message: 'The _id field cannot be blank' })
  @IsMongoId({ message: 'The _id field must be a Id of MongoDB' })
  @ApiProperty({
    description: 'The _id field must be a string',
    example: 'aa75d55d-3bfb-4e2e-bf25-1851e077f2f9',
    required: true,
  })
  _id: string
}
