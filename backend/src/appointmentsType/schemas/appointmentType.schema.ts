import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type AppointmentTypeDocument = AppointmentType & Document

@Schema({ timestamps: false })
export class AppointmentType {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Prop({
    type: String,
    required: false,
  })
  remote_id?: string

  @Prop({
    type: String,
    required: true,
  })
  display_name: string

  @Prop({
    type: Array,
    default: [],
  })
  procedure_codes: Array<string>

  @Prop({
    type: String,
    required: false,
  })
  appointment_length?: string

  @Prop({
    type: Object,
    required: false,
  })
  additional_data?: Object
}

export const AppointmentTypeSchema =
  SchemaFactory.createForClass(AppointmentType)
