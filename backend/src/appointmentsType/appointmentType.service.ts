import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  AppointmentType,
  AppointmentTypeDocument,
} from './schemas/appointmentType.schema'
import { CreateAppointmentTypeDto } from './dto/createAppointmentType.dto'
import { UpdateAppointmentTypeDto } from './dto/updateAppointmentType.dto'

@Injectable()
export class AppointmentTypeService {
  private readonly logger = new Logger(AppointmentTypeService.name)
  constructor(
    @InjectModel(AppointmentType.name)
    private readonly appointmentTypeModel: Model<AppointmentTypeDocument>,
  ) {}

  async create(
    createAppointmentTypeDto: CreateAppointmentTypeDto,
  ): Promise<AppointmentType> {
    const newAppointmentType = new this.appointmentTypeModel(
      createAppointmentTypeDto,
    )
    return newAppointmentType.save()
  }

  async findAll(): Promise<AppointmentType[]> {
    return this.appointmentTypeModel.find().exec()
  }

  async findById(_id: string): Promise<AppointmentType> {
    const appointmentType = await this.appointmentTypeModel.findById(_id).exec()
    if (!appointmentType) {
      throw new NotFoundException(`AppointmentType with ID ${_id} not found`)
    }
    return appointmentType
  }

  async update(
    _id: string,
    updateAppointmentTypeDto: UpdateAppointmentTypeDto,
  ): Promise<AppointmentTypeDocument> {
    const updatedAppointmentType = await this.appointmentTypeModel
      .findByIdAndUpdate(_id, updateAppointmentTypeDto, { new: true })
      .exec()

    if (!updatedAppointmentType) {
      throw new NotFoundException(`AppointmentType with ID ${_id} not found`)
    }
    return updatedAppointmentType
  }

  async delete(_id: string): Promise<AppointmentType> {
    const deletedAppointmentType = await this.appointmentTypeModel
      .findByIdAndDelete(_id)
      .exec()
    if (!deletedAppointmentType) {
      throw new NotFoundException(`AppointmentType with ID ${_id} not found`)
    }
    return deletedAppointmentType
  }
}
