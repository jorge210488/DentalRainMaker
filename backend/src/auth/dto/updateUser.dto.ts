import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './createUser.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsUUID(4, { each: true })
  @ApiProperty({
    example: 'e532e9e5-5203-4695-9777-3e319943e431',
    description: 'Identificador de la clínica en formato UUID',
    required: false,
  })
  clinic_id?: string
}
