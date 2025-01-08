import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { ClinicsService } from './clinics.service'
import { CreateClinicDto } from './dtos/createClinic.dto'
import { UpdateClinicDto } from './dtos/updateClinic.dto'
import { Clinic } from './schemas/clinic.schema'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Public } from '../decorators/public.decorator'

@ApiTags('clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard, PermissionsGuard)
  @Permissions('ALL_ACCESS')
  async create(@Body() createClinicDto: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.create(createClinicDto)
  }

  @Public()
  @Get()
  async findAll(): Promise<Clinic[]> {
    return this.clinicsService.findAll()
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Clinic> {
    return this.clinicsService.findById(id)
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Permissions('ALL_ACCESS')
  async update(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto,
  ): Promise<Clinic> {
    return this.clinicsService.update(id, updateClinicDto)
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard, PermissionsGuard)
  @Permissions('ALL_ACCESS')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clinicsService.delete(id)
  }
}
