import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BrevoSmsDocument = BrevoSms & Document

@Schema({ timestamps: true })
export class BrevoSms {
  @Prop({ required: true, unique: true }) // Unique para evitar duplicados
  messageId: string

  @Prop({ required: true })
  recipient: string

  @Prop({ required: true })
  status: string // 'sent', 'delivered', 'failed', etc.

  @Prop({ required: true })
  content: string

  @Prop({ required: false }) // Puede no existir si el SMS falló antes de enviarse
  sentAt?: Date
}

export const BrevoSmsSchema = SchemaFactory.createForClass(BrevoSms)
