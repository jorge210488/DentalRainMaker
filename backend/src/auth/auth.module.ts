import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Credential, CredentialSchema } from './schemas/credential.schema'
import { Role, RoleSchema } from '../roles/schemas/role.schema'
import { NodemailerService } from '../nodemailer/nodemailer.service'
import { ContactsModule } from 'src/contacts/contacts.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    ContactsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, NodemailerService],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
