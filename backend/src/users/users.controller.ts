import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Query,
    HttpCode,
    UseGuards,
    Req, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @HttpCode(201)
    @Post()
    async registerUser(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<UserDocument> {
        return this.usersService.registerUser({
        ...registerUserDto,
        });
    }


    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    async getUsers(): Promise<UserDocument[]> {
        return this.usersService.getUsers();
    }


    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    async updateUser(
        @Param('id') _id: string,
        @Body() updateUserDto: RegisterUserDto,
    ): Promise<UserDocument> {
        return this.usersService.updateUser(_id, updateUserDto);
    }


    @ApiBearerAuth()
    @HttpCode(204)
    @Delete(':id')
    async deleteUser(@Param('id') _id: string): Promise<void> {
        return this.usersService.deleteUser(_id);
    }
}
