import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'
import { ResourcesService } from './resource.service'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'

@ApiBearerAuth()
@ApiTags('Resources')
@Controller('resources')
@UseGuards(RolesGuard, PermissionsGuard)
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiQuery({ name: 'clinic_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Resources records found.' })
  @ApiResponse({ status: 404, description: 'Resources records not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getAllResources(@Query('clinic_id') clinic_id: string) {
    return this.resourceService.getResources(clinic_id)
  }
}
