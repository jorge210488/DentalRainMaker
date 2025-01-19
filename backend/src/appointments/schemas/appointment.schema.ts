import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type AppointmentDocument = Appointment & Document

@Schema({ timestamps: true })
export class Appointment {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({
    type: String,
    required: false,
  })
  name?: string

  @Prop({
    type: String,
    required: false,
  })
  remote_id?: string

  // Relación con el esquema User
  @Prop({
    type: String,
    ref: 'User',
    required: true,
  })
  contact_id: string

  @Prop({
    type: Object,
    default: {},
  })
  contact: {
    name: string
    remote_id: string
    given_name: string
    family_name: string
  }

  @Prop({
    type: String,
    required: true,
  })
  location: string

  @Prop({
    type: Date,
    required: true,
  })
  start_time: Date

  @Prop({
    type: Date,
    required: false,
  })
  end_time?: Date

  @Prop({
    type: Date,
    required: false,
  })
  wall_start_time?: Date

  @Prop({
    type: Date,
    required: false,
  })
  wall_end_time?: Date

  @Prop({
    type: String,
    required: false,
  })
  time_zone?: string

  @Prop({
    type: Array,
    default: [],
  })
  providers?: Array<{
    name: string
    remote_id: string
    type: string
    display_name: string
  }>

  @Prop({
    type: Array,
    default: [],
  })
  scheduler?: Array<{
    name: string
    remote_id: string
    type: string
    display_name: string
  }>

  // Relación con el esquema AppointmentType
  @Prop({
    type: String,
    ref: 'AppointmentType',
    required: true,
  })
  appointment_type_id: string

  @Prop({
    type: String,
    required: false,
  })
  short_description?: string

  @Prop({
    type: String,
    required: false,
  })
  notes?: string

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  confirmed: boolean

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  cancelled: boolean

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  completed: boolean

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  broken: boolean

  @Prop({
    type: Object,
    required: false,
  })
  additional_data?: {
    doctor_id: string
    doctor_name: string
    clinic_id: string
    clinic_name: string
    paid: boolean
  }
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
