import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Roles } from '../decorators/roles.decorator'
import { Permissions } from '../decorators/permissions.decorator'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { CloudinaryDto } from './dto/cloudinary.dto'

@ApiTags('Cloudinary')
@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('ADMIN', 'PATIENT')
  @Permissions('ALL_ACCESS', 'UPDATE_USER')
  @Post('/files/uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({
    name: 'id',
    description: 'ID del recurso al cual asociar la imagen',
    type: 'string',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Archivo de imagen que será subido. Debe ser JPG, PNG, o WEBP y menor a 2MB.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImg(
    @Param('id', new ParseUUIDPipe()) id: string, // Valida que el ID sea un UUID válido
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // 2MB
            message: 'El archivo debe ser menor a 2MB',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/, // Solo imágenes JPG, PNG, o WEBP
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: CloudinaryDto,
  ) {
    return this.cloudinaryService.uploadImage(id, file, dto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('ADMIN')
  @Permissions('ALL_ACCESS')
  @Post('/files/dentalrainmaker')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Archivo de imagen que será subido. Debe ser JPG, PNG, o WEBP y menor a 2MB.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImages(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // 2MB
            message: 'El archivo debe ser menor a 2MB',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImages(file)
  }
}
