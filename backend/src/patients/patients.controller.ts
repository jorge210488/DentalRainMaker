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
}
