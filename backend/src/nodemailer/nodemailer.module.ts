import { Module } from '@nestjs/common'
import { NodemailerService } from './nodemailer.service'
import { ContactsModule } from 'src/contacts/contacts.module'
import { NodemailerController } from './nodemailer.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Nodemailer, NodemailerSchema } from './schemas/nodemailer.schema'
import { BrevoService } from './brevo.service'

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forFeature([
      { name: Nodemailer.name, schema: NodemailerSchema },
    ]),
  ],
  providers: [NodemailerService, BrevoService],
  controllers: [NodemailerController],
  exports: [NodemailerService],
})
export class NodemailerModule {}
