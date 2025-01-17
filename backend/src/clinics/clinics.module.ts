import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClinicsService } from './clinics.service'
import { ClinicsController } from './clinics.controller'
import { Clinic, ClinicSchema } from './schemas/clinic.schema'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService, ClinicConfigService],
  exports: [ClinicsService, MongooseModule, ClinicConfigService],
})
export class ClinicsModule {}
