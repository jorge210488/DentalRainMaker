import { Module } from '@nestjs/common'
import { InsuranceController } from './insurance.controller'
import { InsuranceService } from './insurance.service'
import { ContactsModule } from 'src/contacts/contacts.module'
import { ClinicsModule } from 'src/clinics/clinics.module'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, ContactsModule, ClinicsModule, ConfigModule],
  controllers: [InsuranceController],
  providers: [InsuranceService, ClinicConfigService],
})
export class InsuranceModule {}
