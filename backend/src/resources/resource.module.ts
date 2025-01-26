import { Module } from '@nestjs/common'
import { ClinicsModule } from 'src/clinics/clinics.module'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { ResourcesService } from './resource.service'
import { ResourcesController } from './resource.controller'

@Module({
  imports: [HttpModule, ClinicsModule, ConfigModule],
  controllers: [ResourcesController],
  providers: [ResourcesService, ClinicConfigService],
})
export class ResourcesModule {}
