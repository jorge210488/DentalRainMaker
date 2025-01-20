import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { v4 as uuidv4 } from 'uuid'
import { hashPasswordMiddleware } from '../middlewares/hash-password.middleware'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Role } from '../../roles/schemas/role.schema'

export type CredentialDocument = Credential & Document

@Schema({ timestamps: true })
export class Credential {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: false })
  password: string

  @Prop({
    type: String,
    enum: ['local', 'google', 'facebook', 'linkedin'], // Proveedores permitidos
    required: true,
    default: 'local',
  })
  provider: string

  @Prop({
    type: String,
    required: function () {
      return this.provider !== 'local'
    },
  })
  providerId: string

  @Prop({
    type: String,
    required: false,
  })
  remote_id?: string

  @Prop({
    type: String,
    required: true,
  })
  clinic_id: string

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Role',
    required: true,
  })
  type: Role
}

export const CredentialSchema = SchemaFactory.createForClass(Credential)

// Middleware para encriptar contraseñas antes de guardar
CredentialSchema.pre('save', hashPasswordMiddleware)
