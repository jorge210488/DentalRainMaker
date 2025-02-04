import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SurveyResponseDocument = SurveyResponse & Document

@Schema({ timestamps: true })
export class SurveyResponse {
  @Prop({ required: true })
  appointment_id: string

  @Prop({ required: true })
  clinic_id: string

  @Prop({ required: true, min: 1, max: 5 })
  satisfaction: number

  @Prop({ required: true, min: 1, max: 5 })
  waiting_time: number

  @Prop({ required: true, min: 1, max: 5 })
  cleanliness: number

  @Prop({ required: true, min: 1, max: 5 })
  staff_friendly: number

  @Prop({ required: true, min: 1, max: 5 })
  doctor_explanation: number

  @Prop({ required: false, min: 1, max: 5 })
  doctor_listened?: number

  @Prop({ required: false, min: 1, max: 5 })
  recommend_doctor?: number

  @Prop({ required: false })
  feedback_comments?: string
}

export const SurveyResponseSchema = SchemaFactory.createForClass(SurveyResponse)
