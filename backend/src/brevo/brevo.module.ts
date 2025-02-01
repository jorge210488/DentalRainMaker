import { Module } from '@nestjs/common'
import { BrevoService } from './brevo.service'
import { BrevoController } from './brevo.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BrevoCompany, BrevoCompanySchema } from './schemas/brevoCompany.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BrevoCompany.name, schema: BrevoCompanySchema },
    ]),
  ],
  providers: [BrevoService],
  controllers: [BrevoController],
  exports: [BrevoService],
})
export class BrevoModule {}
