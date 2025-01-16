import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { RoleViewsEnum } from '../enums/views.enum'

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

  @IsOptional()
  @IsArray({ message: 'Las vistas deben ser un arreglo de valores válidos' })
  @ArrayNotEmpty({ message: 'El arreglo de vistas no puede estar vacío' })
  @IsEnum(RoleViewsEnum, {
    each: true,
    message: `Cada vista debe ser un valor válido del enum: ${Object.values(
      RoleViewsEnum,
    ).join(', ')}`,
  })
  @ApiProperty({
    description:
      'La lista de vistas asociadas al rol, basada en un enum. Ejemplo: ["USER_PROFILE", "ALL_VIEWS"]',
    example: ['USER_PROFILE', 'ALL_VIEWS'],
  })
  views?: RoleViewsEnum[]
}
