import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/schemas/user.schema'
import { CloudinaryConfig } from '../config/cloudinary'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  providers: [CloudinaryService, CloudinaryConfig],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
