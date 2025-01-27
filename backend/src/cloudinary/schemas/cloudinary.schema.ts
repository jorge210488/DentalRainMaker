import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CloudinaryDocument = Cloudinary & Document

@Schema({ timestamps: true })
export class Cloudinary {
  @Prop({
    type: String,
    required: true,
  })
  remote_id: string

  @Prop({
    type: String,
    required: true,
  })
  img_url: string

  @Prop({
    type: String,
    required: true,
  })
  clinic_id: string
}

export const CloudinarySchema = SchemaFactory.createForClass(Cloudinary)
