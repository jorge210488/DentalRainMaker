import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserDocument } from './schemas/user.schema'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { StateUserDto } from './dto/stateUser.dto'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @Permissions('ALL_ACCESS', 'READ_ALL_USERS')
  async getUsers(): Promise<UserDocument[]> {
    return this.usersService.getUsers()
  }

  @HttpCode(200)
  @Get(':id')
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getUserById(@Param('id') _id: string): Promise<UserDocument> {
    return this.usersService.getUserById(_id)
  }

  @HttpCode(200)
  @Put(':id')
  @Permissions('ALL_ACCESS', 'UPDATE_USER')
  async updateUser(
    @Param('id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.updateUser(_id, updateUserDto)
  }

  @HttpCode(200)
  @Put('state/:id')
  @Permissions('ALL_ACCESS', 'SOFT_DELETE_USER')
  async updateStateUser(
    @Param('id') _id: string,
    @Body() stateUserDto: StateUserDto,
  ): Promise<UserDocument> {
    const { state } = stateUserDto
    return this.usersService.updateStateUser(_id, state)
  }

  @HttpCode(204)
  @Delete(':id')
  @Permissions('ALL_ACCESS', 'DELETE_USER')
  async deleteUser(@Param('id') _id: string): Promise<void> {
    return this.usersService.deleteUser(_id)
  }
}
