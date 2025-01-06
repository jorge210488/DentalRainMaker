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
import { Roles } from '../decorators/roles.decorator'
import { Permissions } from '../decorators/permissions.decorator'

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
@Roles('ADMIN')
@Permissions('ALL_ACCESS', 'READ_ALL_USERS')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  async getUsers(): Promise<UserDocument[]> {
    return this.usersService.getUsers()
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  async updateUser(
    @Param('id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.updateUser(_id, updateUserDto)
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put('state/:id')
  async updateStateUser(
    @Param('id') _id: string,
    @Body() stateUserDto: StateUserDto,
  ): Promise<UserDocument> {
    const { state } = stateUserDto
    return this.usersService.updateStateUser(_id, state)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') _id: string): Promise<void> {
    return this.usersService.deleteUser(_id)
  }
}
