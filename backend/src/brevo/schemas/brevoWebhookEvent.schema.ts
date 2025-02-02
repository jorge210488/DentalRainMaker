import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BrevoWebhookEventDocument = BrevoWebhookEvent & Document

@Schema({ timestamps: true })
export class BrevoWebhookEvent {
  @Prop({ required: true })
  eventType: string

  @Prop({ required: false })
  eventId?: string

  @Prop({ required: false })
  email?: string

  @Prop({ required: true })
  timestamp: Date

  @Prop({ type: Object })
  metadata: Record<string, any>
}

export const BrevoWebhookEventSchema =
  SchemaFactory.createForClass(BrevoWebhookEvent)
