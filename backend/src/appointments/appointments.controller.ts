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
  BadRequestException,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiExcludeEndpoint,
} from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { AppointmentsService } from './appointments.service'
import { Permissions } from '../decorators/permissions.decorator'
import { CreateAppointmentDto } from './dto/createAppointment.dto'
import { UpdateAppointmentDto } from './dto/updateAppointment.dto'
import { CancelAppointmentDto } from './dto/cancelAppointment.dto'
import { Public } from '../decorators/public.decorator'
import { CreateSurveyResponseDto } from './dto/createSurveyResponse.dto'

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

  @Get('contact/:contact_id')
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to fetch appointment details.',
  })
  @ApiParam({
    name: 'contact_id',
    required: true,
    type: String,
    description: 'The ID of the contact to retrieve.',
  })
  async getAppointmentByContactId(
    @Query('clinic_id') clinicId: string,
    @Param('contact_id') contactId: string,
  ) {
    return await this.appointmentsService.getAppointmentsByContactId(
      clinicId,
      contactId,
    )
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
  @ApiQuery({
    name: 'clinic_id',
    required: true,
    type: String,
    description: 'The ID of the clinic to fetch patients next and last visit.',
  })
  async getVisits(@Query('clinicId') clinicId: string) {
    return await this.appointmentsService.getVisits(clinicId)
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

  @Public()
  @ApiExcludeEndpoint()
  @HttpCode(201)
  @Post('survey')
  async receiveSurveyResponse(@Body() data: CreateSurveyResponseDto) {
    console.log('📩 Survey response received:', JSON.stringify(data, null, 2))

    if (!data.appointment_id || !data.clinic_id) {
      throw new BadRequestException(
        'Invalid survey data: Missing appointment_id or clinic_id',
      )
    }

    return await this.appointmentsService.createSurveyResponse(data)
  }
}
