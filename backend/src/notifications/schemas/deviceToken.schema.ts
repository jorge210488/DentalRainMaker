import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

@Schema()
export class DeviceToken extends Document {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string

  @Prop({ required: true, unique: true })
  token: string

  @Prop({ default: Date.now })
  createdAt: Date
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken)
