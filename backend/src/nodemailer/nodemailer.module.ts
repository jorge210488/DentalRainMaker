import { Module } from '@nestjs/common'
import { NodemailerService } from './nodemailer.service'
import { ContactsModule } from 'src/contacts/contacts.module'
import { NodemailerController } from './nodemailer.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Nodemailer, NodemailerSchema } from './schemas/nodemailer.schema'

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forFeature([
      { name: Nodemailer.name, schema: NodemailerSchema },
    ]),
  ],
  providers: [NodemailerService],
  controllers: [NodemailerController],
  exports: [NodemailerService],
})
export class NodemailerModule {}
