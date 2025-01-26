import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Nodemailer extends Document {
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
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email address format.',
    },
  })
  to: string

  @Prop({
    type: String,
    required: true,
  })
  subject: string

  @Prop({
    type: String,
    required: true,
  })
  greetings?: string

  @Prop({
    type: String,
    required: true,
  })
  given_name: string

  @Prop({
    type: String,
    required: true,
  })
  clinic_name: string

  @Prop({
    type: String,
    required: true,
  })
  body: string

  @Prop({
    type: String,
  })
  link?: string

  @Prop({
    type: String,
    required: true,
  })
  closing?: string

  @Prop({
    type: String,
    required: true,
  })
  signature?: string

  @Prop({
    type: Date,
    default: Date.now,
  })
  sendAt?: Date
}

export const NodemailerSchema = SchemaFactory.createForClass(Nodemailer)
