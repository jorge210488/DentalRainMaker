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
    
    const [user, doctor, clinic, appointmentType] = await Promise.all([
      this.userModel.findById(createAppointmentDto.contact_id).exec(),
      this.userModel.findById(createAppointmentDto.additional_data.doctor_id).exec(),
      this.clinicModel.findById(createAppointmentDto.additional_data.clinic_id).exec(),
      this.appointmentTypeModel
        .findById(createAppointmentDto.appointment_type_id)
        .exec(),
    ])
    console.log('Usuario', user)
    console.log('Doctor', doctor)
    console.log('Clinica', clinic)
    console.log('Tipo de cita', appointmentType)

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAppointmentDto.contact_id} not found`,
      )
    }
    if (!doctor) {
      throw new NotFoundException(
        `Doctor with ID ${createAppointmentDto.additional_data.doctor_id} not found`,
      )
    }
    if (!clinic) {
      throw new NotFoundException(
        `Clinic with ID ${createAppointmentDto.additional_data.clinic_id} not found`,
      )
    }
    if (!appointmentType) {
      throw new NotFoundException(
        `Appointment Type with ID ${createAppointmentDto.appointment_type_id} not found`,
      )
    }

    const name = `Cita de ${user.name} con ${doctor.name}`

    const contact = {
      name: user.name,
      remote_id: user.remote_id || 'null',
      given_name: user.given_name,
      family_name: user.family_name,
    }

    const additional_data = {
      doctor_id: doctor._id,
      doctor_name: doctor.name,
      clinic_id: clinic._id,
      clinic_name: clinic.clinic_name,
      paid: false,
    }

    const newAppointment = new this.appointmentModel({
      ...createAppointmentDto,
      name,
      contact,
      additional_data,
    })

    const appointment = new this.appointmentModel(newAppointment)
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

  async getAppointmentByUserId(contact_id: string): Promise<AppointmentDocument[]> {
    const appointments = await this.appointmentModel.find({ contact_id }).exec();
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException(`Appointments for User ID "${contact_id}" not found`);
    }
    return appointments;
  }

  async getAppointmentByDoctorId(doctor_id: string): Promise<AppointmentDocument[]> {
    const appointments = await this.appointmentModel.find({ 'additional_data.doctor_id':doctor_id }).exec();
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException(`Appointments for Doctor ID "${doctor_id}" not found`);
    }
    return appointments;
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
    field: 'confirmed' | 'cancelled' | 'completed' | 'broken' ,
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
