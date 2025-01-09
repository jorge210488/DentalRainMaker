import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({ type: String, required: true })
  userId: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  body: string

  @Prop({ type: Object })
  data?: Record<string, string>

  @Prop({ type: Date, default: Date.now })
  sendAt?: Date

  @Prop({ default: false })
  isRead: boolean

  @Prop({ default: false })
  isSent?: boolean
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)

NotificationSchema.index(
  { userId: 1, type: 1, title: 1, data: 1 },
  { unique: true },
)
