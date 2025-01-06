import { Module } from '@nestjs/common'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './permissions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Permission, PermissionSchema } from './schemas/permission.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
