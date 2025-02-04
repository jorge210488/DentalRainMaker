import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { ClinicsModule } from '../clinics/clinics.module'
import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { ContactsModule } from 'src/contacts/contacts.module'
import { ResourcesService } from 'src/resources/resource.service'
import { AppointmentsMakeConnectionMiddleware } from './middlewares/appointmentsMakeConnection.middleware'
import { MongooseModule } from '@nestjs/mongoose'
import {
  SurveyResponse,
  SurveyResponseSchema,
} from './schemas/surveyResponse.schema'
import { BrevoModule } from 'src/brevo/brevo.module'

@Module({
  imports: [
    ClinicsModule,
    HttpModule,
    ConfigModule,
    ContactsModule,
    BrevoModule,
    MongooseModule.forFeature([
      { name: SurveyResponse.name, schema: SurveyResponseSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClinicConfigService, ResourcesService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppointmentsMakeConnectionMiddleware)
      .forRoutes({ path: 'appointments/survey', method: RequestMethod.POST })
  }
}
