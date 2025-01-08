import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/users/schemas/user.schema'
import { AppointmentType } from 'src/appointmentsType/schemas/appointmentType.schema'

export type UserDocument = Appointment & Document

@Schema({ timestamps: true})
export class Appointment {
    @Prop({
        type: String,
        default: uuidv4,
    })
    _id: string

    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: String,
        required: false,
    })
    remote_id?: string

    // Relación con el esquema User
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    contact_id: User

    @Prop({
        type: Object,
        default: {},
      })
    contact: {
    name: string
    remote_id: string
    given_name: string
    family_name: string
    }

    @Prop({
        type: String,
        required: true,
    })
    location: string

    @Prop({
        type: Date,
        required: true,
    })
    start_time: Date

    @Prop({
        type: Date,
        required: true,
    })
    end_time: Date

    @Prop({
        type: Date,
        required: true,
    })
    wall_start_time?: Date

    @Prop({
        type: Date,
        required: true,
    })
    wall_end_time?: Date

    @Prop({
        type: String,
        required: true,
    })
    time_zone?: string

    @Prop({
        type: Array,
        default: [],
      })
    providers?: Array<{
        name: string
        remote_id: string
        type: string
        display_name: string
    }>

    @Prop({
        type: Array,
        default: [],
      })
    scheduler?: Array<{
        name: string
        remote_id: string
        type: string
        display_name: string
    }>

    // Relación con el esquema AppointmentType
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'AppointmentType',
        required: true,
    })
    appointment_type_id: AppointmentType

    @Prop({
        type: String,
        required: true,
      })
    short_description: string

    @Prop({
        type: String,
        required: true,
      })
    notes: string

    @Prop({
        type: Boolean,
        required: true,
        default: false,
      })
    confirmed: boolean

    @Prop({
        type: Boolean,
        required: true,
        default: false,
      })
    cancelled: boolean

    @Prop({
        type: Boolean,
        required: true,
        default: false,
      })
    completed: boolean

    @Prop({
        type: Boolean,
        required: true,
        default: false,
      })
    broken: boolean

    @Prop({
        type: Object,
        required: true,
      })
    additional_data: Object
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
