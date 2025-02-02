import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { BrevoService } from './brevo.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BrevoController } from './brevo.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BrevoCompany, BrevoCompanySchema } from './schemas/brevoCompany.schema'
import { BrevoWebhookAuthMiddleware } from './middlewares/brevoWebhookAuth.middleware'
import {
  BrevoWebhookEvent,
  BrevoWebhookEventSchema,
} from './schemas/brevoWebhookEvent.schema'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: BrevoCompany.name, schema: BrevoCompanySchema },
      { name: BrevoWebhookEvent.name, schema: BrevoWebhookEventSchema },
    ]),
  ],
  providers: [BrevoService, BrevoWebhookAuthMiddleware],
  controllers: [BrevoController],
  exports: [BrevoService],
})
export class BrevoModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BrevoWebhookAuthMiddleware)
      .forRoutes({ path: 'brevo/email-campaign', method: RequestMethod.POST })
  }
}
