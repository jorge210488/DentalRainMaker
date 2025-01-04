import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UserDocument } from '../users/schemas/user.schema'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.authService.signup(createUserDto)
  }
}
