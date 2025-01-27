import { Controller, Get, Query } from '@nestjs/common';
import { PatientService } from './patients.service';


@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async getPatients(
    @Query('clinicId') clinicId: string,
  ) {
    return await this.patientService.getPatients(clinicId);
  }


  @Get('paginated')
  async getPaginatedPatients(
    @Query('clinicId') clinicId: string,
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.patientService.getPaginatedPatients(clinicId, page, pagesize);
  }
}
