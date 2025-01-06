import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Permission } from '../enums/permissions.enum'

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'El nombre del permiso no puede estar vacío' })
  @IsEnum(Permission, {
    message:
      'El nombre del permiso debe ser un valor válido del enum Permission',
  })
  @ApiProperty({
    description:
      'El nombre único del permiso, debe ser un valor válido del enum Permission',
    example: 'UPDATE_USER',
    enum: Permission,
  })
  name: Permission

  @IsNotEmpty({ message: 'La descripción del permiso no puede estar vacía' })
  @IsString({
    message: 'La descripción del permiso debe ser una cadena de texto',
  })
  @Length(5, 200, {
    message: 'La descripción del permiso debe tener entre 5 y 200 caracteres',
  })
  @ApiProperty({
    description:
      'Una descripción detallada del permiso, no puede estar vacía y debe tener entre 5 y 200 caracteres',
    example: 'Permite crear nuevos usuarios en el sistema',
  })
  description: string
}
