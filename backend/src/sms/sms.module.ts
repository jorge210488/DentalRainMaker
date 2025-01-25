import { Module } from '@nestjs/common'
import { SmsController } from './sms.controller'
import { SmsService } from './sms.service'
import { ContactsModule } from 'src/contacts/contacts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Sms, SmsSchema } from './schemas/sms.schema'

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }]),
  ],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
