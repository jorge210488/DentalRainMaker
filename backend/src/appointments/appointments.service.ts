import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Appointment, AppointmentDocument } from './schemas/appointment.schema'
import { Clinic, ClinicDocument } from 'src/clinics/schemas/clinic.schema'
import { CreateAppointmentDto } from './dto/createAppointment.dto'

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name)
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<ClinicDocument>,
  ) {}

  async getAppointments(): Promise<AppointmentDocument[]> {
    return this.appointmentModel.find().exec()
  }

  async getAppointmentById(_id: string): Promise<AppointmentDocument> {
    const appointment = await this.appointmentModel.findById(_id).exec()
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${_id}" not found`)
    }
    return appointment
  }

  async updateAppointment(
    _id: string,
    updateAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentDocument> {
    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(_id, updateAppointmentDto, {
        new: true,
      })
      .exec()
    if (!updatedAppointment) {
      throw new NotFoundException('Appointment not found')
    }
    return updatedAppointment
  }

  async updateStatusAppointment(
    id: string,
    field: 'confirmed' | 'cancelled' | 'completed' | 'broken',
    value: boolean,
  ): Promise<Appointment> {
    // Validar el campo
    if (!['confirmed', 'cancelled', 'completed', 'broken'].includes(field)) {
      throw new BadRequestException(`Invalid field: ${field}`)
    }

    // Buscar el appointment
    const appointment = await this.appointmentModel.findById(id)
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`)
    }

    // Actualizar el estado
    appointment[field] = value
    return await appointment.save()
  }

  async deleteAppointment(_id: string): Promise<void> {
    const result = await this.appointmentModel.findByIdAndDelete(_id).exec()
    if (!result) {
      throw new NotFoundException('Appointment not found')
    }
  }
}
