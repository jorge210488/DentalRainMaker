import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Credential, CredentialSchema } from './schemas/credential.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { Role, RoleSchema } from '../roles/schemas/role.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
