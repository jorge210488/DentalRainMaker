import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'
import { InsuranceService } from './insurance.service'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'

@ApiBearerAuth()
@ApiTags('Insurance')
@Controller('insurance')
@UseGuards(RolesGuard, PermissionsGuard)
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('benefits/:remote_id/:insurance_id')
  @ApiOperation({ summary: 'Get insurance Benefits by remote ID' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Insurance Benefits record found.' })
  @ApiResponse({
    status: 404,
    description: 'Insurance Benefits record not found.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getInsuranceBenefitsById(
    @Query('clinicId') clinicId: string,
    @Param('remote_id') remoteId: string,
    @Param('insurance_id') insuranceId: string,
  ) {
    return this.insuranceService.getInsuranceBenefitsById(
      clinicId,
      remoteId,
      insuranceId,
    )
  }

  @Get(':remote_id/insurance')
  @ApiOperation({ summary: 'Get insurance Coverage by remote ID' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Insurance record found.' })
  @ApiResponse({ status: 404, description: 'Insurance record not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getInsuranceCoverageById(
    @Query('clinicId') clinicId: string,
    @Param('remote_id') remoteId: string,
  ) {
    return this.insuranceService.getInsuranceCoverageById(clinicId, remoteId)
  }


  @Get('/all')
  @ApiOperation({ summary: 'Get All insurances Coverage' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Insurances records found.' })
  @ApiResponse({ status: 404, description: 'Insurances records not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getAllInsuranceCoverage(
    @Query('clinicId') clinicId: string
  ) {
    return this.insuranceService.getAllInsuranceCoverage(clinicId)
  }

  
}

