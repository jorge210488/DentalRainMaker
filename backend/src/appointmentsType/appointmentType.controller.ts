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
import { AuthGuard } from '../guards/auth.guard'
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
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class AppointmentTypeController {
  constructor(
    private readonly appointmentTypeService: AppointmentTypeService,
  ) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(RolesGuard, PermissionsGuard)
  @Post()
  @Permissions('ALL_ACCESS')
  async create(@Body() createAppointmentTypeDto: CreateAppointmentTypeDto) {
    return this.appointmentTypeService.create(createAppointmentTypeDto)
  }

  @Public()
  @HttpCode(200)
  @Get()
  @Permissions('ALL_ACCESS')
  async findAll() {
    return this.appointmentTypeService.findAll()
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  @Permissions('ALL_ACCESS')
  async findById(@Param('id') id: string) {
    return this.appointmentTypeService.findById(id)
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Permissions('ALL_ACCESS')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentTypeDto: UpdateAppointmentTypeDto,
  ) {
    return this.appointmentTypeService.update(id, updateAppointmentTypeDto)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Permissions('ALL_ACCESS')
  async deleteAppointmentType(@Param('id') id: string) {
    return this.appointmentTypeService.delete(id)
  }
}
