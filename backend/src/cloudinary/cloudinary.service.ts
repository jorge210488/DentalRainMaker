import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { UploadApiResponse, v2 } from 'cloudinary'
import * as toStream from 'buffer-to-stream'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CloudinaryDto } from './dto/cloudinary.dto'
import { ContactsService } from '../contacts/contacts.service'
import { Cloudinary, CloudinaryDocument } from './schemas/cloudinary.schema'

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectModel(Cloudinary.name)
    private cloudinaryModel: Model<CloudinaryDocument>,
    private readonly contactsService: ContactsService,
  ) {}

  async uploadImage(
    clinicId: string,
    remoteId: string,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('File not provided')
    }

    // Verificar si el contacto existe usando el método getContactById
    const contact = await this.contactsService.getContactById(
      clinicId,
      remoteId,
    )

    if (!contact) {
      throw new NotFoundException(
        `Contact with remoteId ${remoteId} not found in clinic ${clinicId}`,
      )
    }

    // Subir la imagen a Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'DentalRainMaker',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        },
      )
      toStream(file.buffer).pipe(upload)
    })

    // Guardar en el esquema de Cloudinary
    const cloudinaryRecord = new this.cloudinaryModel({
      remote_id: remoteId,
      clinic_id: clinicId, // Agregamos el clinic_id
      img_url: result.secure_url,
    })

    await cloudinaryRecord.save()

    return result
  }

  async uploadImages(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('File not provided')
    }

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'DentalRainMaker Frontend',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        },
      )
      toStream(file.buffer).pipe(upload)
    })

    return result
  }
}
