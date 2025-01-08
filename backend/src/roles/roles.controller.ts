import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/createRole.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { Role } from './schemas/role.schema'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard, PermissionsGuard)
@Permissions('ALL_ACCESS')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto)
  }

  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll()
  }

  @ApiBearerAuth()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findById(id)
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto)
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(id)
  }
}
