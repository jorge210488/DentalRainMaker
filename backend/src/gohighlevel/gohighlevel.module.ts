import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'
import { GohighlevelController } from './gohighlevel.controller'
import { GohighlevelService } from './gohighlevel.service'
// import { ContactSchema } from './schemas/contact.schema'

@Module({
  imports: [
    HttpModule, // Importa el módulo HTTP
    // MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
  controllers: [GohighlevelController],
  providers: [GohighlevelService],
})
export class GoHighLevelModule {}
