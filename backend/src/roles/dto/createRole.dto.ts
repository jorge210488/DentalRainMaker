import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @IsNotEmpty({ message: 'El nombre del rol no puede estar vacío' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El nombre del rol debe tener entre 3 y 50 caracteres',
  })
  @ApiProperty({
    description:
      'El nombre del rol, no puede estar vacío y debe tener entre 3 y 50 caracteres',
    example: 'ADMIN',
  })
  name: string

  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un arreglo de cadenas de texto' })
  @ArrayNotEmpty({ message: 'El arreglo de permisos no puede estar vacío' })
  @IsString({
    each: true,
    message: 'Cada permiso debe ser una cadena de texto',
  })
  @ApiProperty({
    description:
      'La lista de permisos asociados al rol, debe ser un arreglo de cadenas de texto. Ejemplo: ["CREATE_USER", "DELETE_USER"]',
    example: ['CREATE_USER', 'DELETE_USER', 'UPDATE_USER'],
  })
  permissions?: string[]
}
