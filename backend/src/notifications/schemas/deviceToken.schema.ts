import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class DeviceToken extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string

  @Prop({ type: String, ref: 'User', required: true })
  userId: string

  @Prop({ required: true, unique: true })
  token: string
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken)
