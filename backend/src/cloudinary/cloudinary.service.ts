import { Injectable, BadRequestException } from '@nestjs/common'
import { UploadApiResponse, v2 } from 'cloudinary'
import * as toStream from 'buffer-to-stream'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../users/schemas/user.schema'
import { Model } from 'mongoose'
import { CloudinaryDto } from './dto/cloudinary.dto'

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async uploadImage(
    id: string,
    file: Express.Multer.File,
    dto: CloudinaryDto,
  ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('File not provided')
    }

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

    // Usar el DTO para actualizar el campo `img_url` en MongoDB
    await this.userModel.findByIdAndUpdate(
      id,
      { img_url: result.secure_url },
      { new: true }, // Devuelve el documento actualizado
    )

    return result
  }
}
