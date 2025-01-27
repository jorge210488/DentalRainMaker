import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { NotificationType } from '../enums/notifications.enum'

@Schema({ timestamps: true })
export class Notification extends Document {
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
    type: Object,
    required: true,
    validate: {
      validator: (notification: any) => {
        return notification.title && notification.body
      },
      message: 'Notification must contain title and body.',
    },
  })
  notification: {
    title: string
    body: string
  }

  @Prop({
    type: Object,
    required: true,
    validate: {
      validator: (data: any) => {
        return data.type && Object.values(NotificationType).includes(data.type)
      },
      message: 'Invalid notification type in data.',
    },
  })
  data: {
    type: NotificationType
    [key: string]: string | undefined
  }

  @Prop({ type: Date, default: Date.now })
  sendAt?: Date

  @Prop({ default: false })
  isRead: boolean

  @Prop({ default: false })
  isSent?: boolean
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
