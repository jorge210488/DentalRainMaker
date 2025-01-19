import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { CloudinaryConfig } from '../config/cloudinary'
import { AuthModule } from 'src/auth/auth.module'
import { ContactsModule } from 'src/contacts/contacts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Cloudinary, CloudinarySchema } from './schemas/cloudinary.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cloudinary.name, schema: CloudinarySchema },
    ]),
    ContactsModule,
    AuthModule,
  ],
  providers: [CloudinaryService, CloudinaryConfig],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
