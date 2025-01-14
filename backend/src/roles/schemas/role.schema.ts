import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { RoleViewsEnum } from '../enums/views.enum'

export type RoleDocument = Role & Document

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission' }],
    default: [],
  })
  permissions: Types.ObjectId[]

  @Prop({
    type: [String],
    enum: RoleViewsEnum,
    default: [],
  })
  views: RoleViewsEnum[]
}

export const RoleSchema = SchemaFactory.createForClass(Role)
