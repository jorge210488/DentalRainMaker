import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Credential, CredentialSchema } from './schemas/credential.schema'
import { Role, RoleSchema } from '../roles/schemas/role.schema'
import { ContactsModule } from 'src/contacts/contacts.module'
import { NodemailerModule } from 'src/nodemailer/nodemailer.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    ContactsModule,
    NodemailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
