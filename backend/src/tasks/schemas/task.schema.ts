import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string

  @Prop({ type: String, required: true })
  task_name: string

  @Prop({ type: String, required: true })
  task_status: string

  @Prop({ type: String, required: true })
  task_message: string

  @Prop({ type: Date })
  executed_date?: Date

  @Prop({ type: Date })
  nextRun_date?: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
