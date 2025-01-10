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
import { User, UserDocument } from 'src/users/schemas/user.schema'
import {
  AppointmentType,
  AppointmentTypeDocument,
} from 'src/appointmentsType/schemas/appointmentType.schema'

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name)
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<ClinicDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(AppointmentType.name)
    private readonly appointmentTypeModel: Model<AppointmentTypeDocument>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    // Validar si el contact_id existe en la colección User
    const [user, clinic, appointmentType] = await Promise.all([
      this.userModel.findById(createAppointmentDto.contact_id),
      this.clinicModel.findById(createAppointmentDto.clinic_id),
      this.appointmentTypeModel.findById(
        createAppointmentDto.appointment_type_id,
      ),
    ])
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAppointmentDto.contact_id} not found`,
      )
    }
    if (!clinic) {
      throw new NotFoundException(
        `Clinic with ID ${createAppointmentDto.clinic_id} not found`,
      )
    }
    if (!appointmentType) {
      throw new NotFoundException(
        `Appointment Type with ID ${createAppointmentDto.appointment_type_id} not found`,
      )
    }

    const appointment = new this.appointmentModel(createAppointmentDto)
    return appointment.save()
  }

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
    _id: string,
    field: 'confirmed' | 'cancelled' | 'completed' | 'broken',
    value: boolean,
  ): Promise<AppointmentDocument> {
    // Validar el campo
    if (!['confirmed', 'cancelled', 'completed', 'broken'].includes(field)) {
      throw new BadRequestException(`Invalid field: ${field}`)
    }

    // Buscar el appointment
    const appointment = await this.appointmentModel.findById(_id)
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${_id} not found`)
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
