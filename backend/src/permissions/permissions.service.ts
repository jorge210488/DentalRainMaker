import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Permission } from './schemas/permission.schema'
import { CreatePermissionDto } from './dto/createPermission.dto'
import { Permission as PermissionEnum } from './enums/permissions.enum'

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name)
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const newPermission = new this.permissionModel(createPermissionDto)
    return newPermission.save()
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec()
  }

  async findOne(id: string): Promise<Permission | null> {
    return this.permissionModel.findById(id).exec()
  }

  async update(
    id: string,
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission | null> {
    return this.permissionModel
      .findByIdAndUpdate(id, createPermissionDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec()
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.permissionModel.findByIdAndDelete(id).exec()
    return !!result
  }

  async preloadPermissions(): Promise<void> {
    const permissionsToPreload = Object.values(PermissionEnum)

    for (const permission of permissionsToPreload) {
      const exists = await this.permissionModel
        .findOne({ name: permission })
        .exec()

      if (!exists) {
        await this.permissionModel.create({
          name: permission,
          description: `Auto-generated permission for ${permission}`,
        })
        this.logger.log(`Permission "${permission}" created.`)
      } else {
        this.logger.log(`Permission "${permission}" already exists.`)
      }
    }
  }
}
