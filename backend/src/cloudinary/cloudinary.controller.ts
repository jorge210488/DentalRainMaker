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
  Query,
} from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger'
import { CloudinaryDto } from './dto/cloudinary.dto'

@ApiTags('Cloudinary')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Permissions('ALL_ACCESS', 'UPDATE_USER')
  @Post('/files/uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  @ApiQuery({
    name: 'clinicId',
    description: 'ID de la clínica asociada al contacto',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'remoteId',
    description: 'Remote ID del contacto asociado',
    required: true,
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
    @Query('clinicId') clinicId: string, // Obtenemos clinic_id por query
    @Query('remoteId') remoteId: string, // Obtenemos remote_id por query
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
  ) {
    return this.cloudinaryService.uploadImage(clinicId, remoteId, file)
  }

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
