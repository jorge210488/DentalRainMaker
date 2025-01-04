import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { validationSchema } from './config/validation'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '4h' },
      secret: process.env.JWT_SECRET,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
