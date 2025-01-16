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
import { Permissions } from '../decorators/permissions.decorator'
import { AppointmentTypeService } from './appointmentType.service'
import { CreateAppointmentTypeDto } from './dto/createAppointmentType.dto'
import { UpdateAppointmentTypeDto } from './dto/updateAppointmentType.dto'
import { Public } from '../decorators/public.decorator'

@ApiTags('appointment-type')
@ApiBearerAuth()
@Controller('appointment-type')
@UseGuards(RolesGuard, PermissionsGuard)
export class AppointmentTypeController {
  constructor(
    private readonly appointmentTypeService: AppointmentTypeService,
  ) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @Post()
  @Permissions('ALL_ACCESS', 'CREATE_APPOINTMENT_TYPE')
  async create(@Body() createAppointmentTypeDto: CreateAppointmentTypeDto) {
    return this.appointmentTypeService.create(createAppointmentTypeDto)
  }

  @Public()
  @HttpCode(200)
  @Get()
  @Permissions('ALL_ACCESS', 'READ_ALL_APPOINTMENTS_TYPE')
  async findAll() {
    return this.appointmentTypeService.findAll()
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  @Permissions('ALL_ACCESS', 'READ_OWN_APPOINTMENT_TYPE')
  async findById(@Param('id') id: string) {
    return this.appointmentTypeService.findById(id)
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @Permissions('ALL_ACCESS', 'UPDATE_APPOINTMENT_TYPE')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentTypeDto: UpdateAppointmentTypeDto,
  ) {
    return this.appointmentTypeService.update(id, updateAppointmentTypeDto)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @Permissions('ALL_ACCESS', 'DELETE_APPOINTMENT_TYPE')
  async deleteAppointmentType(@Param('id') id: string) {
    return this.appointmentTypeService.delete(id)
  }
}
