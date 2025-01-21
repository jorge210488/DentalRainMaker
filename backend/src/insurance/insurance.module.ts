import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClinicConfigService } from 'src/config/clinicsConfig.service';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { InsuranceService } from "./insurance.service";
import { InsuranceController } from "./insurance.controller";


@Module({
    imports: [HttpModule, ConfigModule, ClinicsModule],
    providers: [InsuranceService, ClinicConfigService],
    controllers: [InsuranceController],
    exports: [InsuranceService],
})
export class InsuranceModule {}