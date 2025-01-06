import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

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
}

export const RoleSchema = SchemaFactory.createForClass(Role)
