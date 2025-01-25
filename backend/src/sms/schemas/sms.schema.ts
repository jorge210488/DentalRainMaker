import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Sms extends Document {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({
    type: String,
    required: true,
  })
  remote_id: string

  @Prop({
    type: String,
    required: true,
  })
  clinic_id: string

  @Prop({
    type: String,
    required: true,
  })
  clinic_name: string

  @Prop({
    type: String,
    required: true,
  })
  to: string

  @Prop({
    type: String,
    required: true,
  })
  body: string

  @Prop({
    type: Date,
    default: Date.now,
  })
  sendAt?: Date
}

export const SmsSchema = SchemaFactory.createForClass(Sms)
