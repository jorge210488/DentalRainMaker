import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { PermissionsService } from './permissions.service'
import { CreatePermissionDto } from './dto/createPermission.dto'
import { Permission } from './schemas/permission.schema'
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger'

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  async findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiParam({
    name: 'id',
    description: 'Permission ID',
    example: '640fdd51fc13ae6f4900001a',
  })
  async findOne(@Param('id') id: string): Promise<Permission> {
    const permission = await this.permissionsService.findOne(id)
    if (!permission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND)
    }
    return permission
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission by ID' })
  @ApiParam({
    name: 'id',
    description: 'Permission ID',
    example: '640fdd51fc13ae6f4900001a',
  })
  async update(
    @Param('id') id: string,
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const updatedPermission = await this.permissionsService.update(
      id,
      createPermissionDto,
    )
    if (!updatedPermission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND)
    }
    return updatedPermission
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiParam({
    name: 'id',
    description: 'Permission ID',
    example: '640fdd51fc13ae6f4900001a',
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.permissionsService.delete(id)
    if (!deleted) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND)
    }
    return { message: 'Permission deleted successfully' }
  }
}
