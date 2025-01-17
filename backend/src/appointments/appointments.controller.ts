import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Param,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { AppointmentsService } from './appointments.service'
import { AppointmentDocument } from './schemas/appointment.schema'
import { Permissions } from '../decorators/permissions.decorator'
import { CreateAppointmentDto } from './dto/createAppointment.dto'
import { UpdateStatusDto } from './dto/updateStatus.dto'

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(RolesGuard, PermissionsGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @HttpCode(200)
  @Post()
  @Permissions('ALL_ACCESS', 'CREATE_APPOINTMENT')
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto)
  }

  @HttpCode(200)
  @Get()
  @Permissions('ALL_ACCESS', 'READ_ALL_APPOINTMENTS')
  async getAppointments(): Promise<AppointmentDocument[]> {
    return this.appointmentsService.getAppointments()
  }

  @HttpCode(200)
  @Get(':id')
  @Permissions('ALL_ACCESS', 'READ_OWN_APPOINTMENT')
  async getAppointmentById(
    @Param('id') _id: string,
  ): Promise<AppointmentDocument> {
    return this.appointmentsService.getAppointmentById(_id)
  }

  @HttpCode(200)
  @Get('user/:id')
  @Permissions('ALL_ACCESS', 'READ_OWN_APPOINTMENT')
  async getAppointmentByUserId(
    @Param('id') contact_id: string,
  ): Promise<AppointmentDocument[]> {
    return this.appointmentsService.getAppointmentByUserId(contact_id)
  }

  @HttpCode(200)
  @Get('doctor/:id')
  @Permissions('ALL_ACCESS', 'READ_OWN_APPOINTMENT')
  async getAppointmentByDoctorId(
    @Param('id') doctor_id: string,
  ): Promise<AppointmentDocument[]> {
    return this.appointmentsService.getAppointmentByDoctorId(doctor_id)
  }

  @HttpCode(200)
  @Put(':id')
  @Permissions('ALL_ACCESS', 'UPDATE_APPOINTMENT')
  async updateAppointment(
    @Param('id') _id: string,
    @Body() updateAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentDocument> {
    return this.appointmentsService.updateAppointment(_id, updateAppointmentDto)
  }

  @HttpCode(200)
  @Put('status/:id')
  @Permissions('ALL_ACCESS', 'UPDATE_APPOINTMENT')
  async updateStatusAppointment(
    @Param('id') _id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<AppointmentDocument> {
    const { field, value } = updateStatusDto
    return this.appointmentsService.updateStatusAppointment(_id, field, value)
  }

  @HttpCode(204)
  @Delete(':id')
  @Permissions('ALL_ACCESS', 'DELETE_APPOINTMENT')
  async deleteAppointment(@Param('id') _id: string): Promise<void> {
    return this.appointmentsService.deleteAppointment(_id)
  }
}
