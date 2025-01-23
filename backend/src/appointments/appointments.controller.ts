import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Param,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { AppointmentsService } from './appointments.service'
import { Permissions } from '../decorators/permissions.decorator'
import { CreateAppointmentDto } from './dto/createAppointment.dto'
import { UpdateAppointmentDto } from './dto/updateAppointment.dto'
import { CancelAppointmentDto } from './dto/cancelAppointment.dto'

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(RolesGuard, PermissionsGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiQuery({
    name: 'page_size',
    required: false,
    type: Number,
    description:
      'The maximum number of appointments to return. Default is 50, maximum is 1000.',
  })
  @ApiQuery({
    name: 'page_token',
    required: false,
    type: String,
    description: 'Token for fetching the next page of results.',
  })
  @ApiQuery({
    name: 'order_by',
    required: false,
    type: String,
    description: 'Order by parameter.',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description:
      'Filter parameter with accepted fields such as remote_id, contact_id, start_time, etc.',
  })
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to filter appointments.',
  })
  async getAppointments(
    @Query('clinic_id') clinicId: string, // Obligatorio para la configuración
    @Query('page_size') pageSize?: number,
    @Query('page_token') pageToken?: string,
    @Query('order_by') orderBy?: string,
    @Query('filter') filter?: string,
  ) {
    const queryParams = {
      page_size: pageSize || 50,
      page_token: pageToken,
      order_by: orderBy,
      filter,
    }

    return await this.appointmentsService.getAppointments(clinicId, queryParams)
  }

  @Get('appointmenttypes')
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to fetch appointment types.',
  })
  async getAppointmentTypes(@Query('clinic_id') clinicId: string) {
    return await this.appointmentsService.getAppointmentTypes(clinicId)
  }

  @Get('resources')
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to fetch appointment resources.',
  })
  async getAppointmentResources(@Query('clinic_id') clinicId: string) {
    return await this.appointmentsService.getAppointmentResources(clinicId)
  }

  @Get('visits')
  async getVisits(
    @Query('clinicId') clinicId: string,
    @Query('contactId') contactId: string,
  ) {
    return await this.appointmentsService.getVisits(clinicId, contactId)
  }

  @Get(':appointment_id')
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to fetch appointment details.',
  })
  @ApiParam({
    name: 'appointment_id',
    required: true,
    type: String,
    description: 'The ID of the appointment to retrieve.',
  })
  async getAppointmentById(
    @Query('clinic_id') clinicId: string,
    @Param('appointment_id') appointmentId: string,
  ) {
    return await this.appointmentsService.getAppointmentById(
      clinicId,
      appointmentId,
    )
  }

  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to associate with the appointment.',
  })
  async createAppointment(
    @Query('clinic_id') clinicId: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return await this.appointmentsService.createAppointment(
      clinicId,
      createAppointmentDto,
    )
  }

  @Patch(':appointment_id')
  @ApiOperation({ summary: 'Update contact by remote ID' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateAppointment(
    @Query('clinicId') clinicId: string,
    @Param('appointment_id') appointmentId: string,
    @Body() updateContactDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateAppointment(
      clinicId,
      appointmentId,
      updateContactDto,
    )
  }

  @Post(':appointment_id/cancel')
  @ApiOperation({ summary: 'Cancel an appointment' })
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic.',
  })
  @ApiParam({
    name: 'appointment_id',
    required: true,
    type: String,
    description: 'The ID of the appointment to cancel.',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment cancelled successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async cancelAppointment(
    @Query('clinic_id') clinicId: string,
    @Param('appointment_id') appointmentId: string,
    @Body() cancelAppointmentDto: CancelAppointmentDto,
  ) {
    return this.appointmentsService.cancelAppointment(
      clinicId,
      appointmentId,
      cancelAppointmentDto,
    )
  }

  // @HttpCode(200)
  // @Post()
  // @Permissions('ALL_ACCESS', 'CREATE_APPOINTMENT')
  // async create(@Body() createAppointmentDto: CreateAppointmentDto) {
  //   return this.appointmentsService.create(createAppointmentDto)
  // }

  // @HttpCode(200)
  // @Get('doctor/:id')
  // @Permissions('ALL_ACCESS', 'READ_OWN_APPOINTMENT')
  // async getAppointmentByDoctorId(
  //   @Param('id') doctor_id: string,
  // ): Promise<AppointmentDocument[]> {
  //   return this.appointmentsService.getAppointmentByDoctorId(doctor_id)
  // }

  // @HttpCode(200)
  // @Put(':id')
  // @Permissions('ALL_ACCESS', 'UPDATE_APPOINTMENT')
  // async updateAppointment(
  //   @Param('id') _id: string,
  //   @Body() updateAppointmentDto: CreateAppointmentDto,
  // ): Promise<AppointmentDocument> {
  //   return this.appointmentsService.updateAppointment(_id, updateAppointmentDto)
  // }

  // @HttpCode(200)
  // @Put('status/:id')
  // @Permissions('ALL_ACCESS', 'UPDATE_APPOINTMENT')
  // async updateStatusAppointment(
  //   @Param('id') _id: string,
  //   @Body() updateStatusDto: UpdateStatusDto,
  // ): Promise<AppointmentDocument> {
  //   const { field, value } = updateStatusDto
  //   return this.appointmentsService.updateStatusAppointment(_id, field, value)
  // }

  // @HttpCode(204)
  // @Delete(':id')
  // @Permissions('ALL_ACCESS', 'DELETE_APPOINTMENT')
  // async deleteAppointment(@Param('id') _id: string): Promise<void> {
  //   return this.appointmentsService.deleteAppointment(_id)
  // }
}
