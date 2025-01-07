import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CloudinaryDto {
  @ApiProperty({
    description: 'Imagen de perfil del usuario',
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  img_url?: string
}
