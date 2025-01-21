import { Controller, Get, Param, Query } from "@nestjs/common";
import { InsuranceService } from "./insurance.service";

@Controller('insurance')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {}

    @Get('contact')
    async getInsurance(
        @Query('clinicId') clinicId: string,
        @Query('contact') contact: string,
    ) {
        return await this.insuranceService.getInsurance(clinicId, contact);
    }
}