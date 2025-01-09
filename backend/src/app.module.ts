import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PreloadService } from './preload.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { PermissionsModule } from './permissions/permissions.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { validationSchema } from './config/validation'
import { NodemailerModule } from './nodemailer/nodemailer.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { AuthGuard } from './guards/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { ClinicsModule } from './clinics/clinics.module'
import { NotificationsModule } from './notifications/notifications.module'
import { ClaimsModule } from './claims/claims.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
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
    NodemailerModule,
    CloudinaryModule,
    ClinicsModule,
    NotificationsModule,
    ClaimsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PreloadService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
