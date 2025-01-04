import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Credential } from '../../auth/schemas/credential.schema'
import { v4 as uuidv4 } from 'uuid'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
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
    enum: ['PATIENT', 'EMPLOYEE', 'ADMIN'],
    required: true,
  })
  type: string

  @Prop({
    type: String,
    required: true,
  })
  given_name: string

  @Prop({
    type: String,
    required: true,
  })
  family_name: string

  @Prop({
    type: String,
    required: false,
  })
  preferred_name?: string

  @Prop({
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
    required: false,
  })
  gender?: string

  @Prop({
    type: String,
    required: false,
  })
  birth_date?: string

  @Prop({
    type: String,
    required: false,
  })
  notes?: string

  @Prop({
    type: Array,
    default: [],
  })
  addresses?: Array<{
    street_address: string
    city: string
    state: string
    postal_code: string
    country_code: string
    type: string
  }>

  @Prop({
    type: Array,
    default: [],
  })
  phone_numbers?: Array<{
    number: string
    type: string
  }>

  @Prop({
    type: String,
    required: false,
  })
  primary_phone_number?: string

  @Prop({
    type: Array,
    default: [],
  })
  email_addresses?: Array<{
    address: string
    type: string
  }>

  @Prop({
    type: String,
    required: true,
    ref: 'Credential', // Relación con Credential
  })
  primary_email_address: string

  @Prop({
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DECEASED'],
    default: 'ACTIVE',
  })
  state: string

  @Prop({
    type: String,
    ref: 'Credential',
    required: true,
  })
  credential: Credential
}

export const UserSchema = SchemaFactory.createForClass(User)
