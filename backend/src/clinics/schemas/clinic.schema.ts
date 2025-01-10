import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type ClinicDocument = Clinic & Document

@Schema({ timestamps: true })
export class Clinic extends Document {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({ required: true })
  clinic_name: string

  @Prop()
  clinic_website?: string
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic)
