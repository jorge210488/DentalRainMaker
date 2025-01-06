import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Role, RoleDocument } from './schemas/role.schema'
import { CreateRoleDto } from './dto/createRole.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import * as rolesData from '../utils/roles.json'

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name)
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto

    const existingRole = await this.roleModel.findOne({ name })
    if (existingRole) {
      throw new BadRequestException('Role already exists')
    }

    const role = new this.roleModel(createRoleDto)
    return role.save()
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec()
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec()
    if (!role) {
      throw new NotFoundException('Role not found')
    }
    return role
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, {
        new: true,
      })
      .exec()

    if (!role) {
      throw new NotFoundException('Role not found')
    }

    return role
  }

  async delete(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException('Role not found')
    }
  }

  async preloadRoles(): Promise<void> {
    this.logger.log('Starting roles preload...')
    for (const roleData of rolesData) {
      const existingRole = await this.roleModel.findOne({ name: roleData.name })
      if (!existingRole) {
        this.logger.log(`Creating role: ${roleData.name}`)
        await this.roleModel.create({
          name: roleData.name,
          permissions: roleData.permissions,
        })
      } else {
        this.logger.log(`Role already exists: ${roleData.name}`)
      }
    }
    this.logger.log('Roles preload completed.')
  }
}
