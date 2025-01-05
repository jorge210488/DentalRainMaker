import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
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

  @Post('signin')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Login with local or third-party authentication (e.g., Google)',
  })
  @ApiResponse({
    status: 201,
    description: 'Login successful. Returns a JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'User not found. Please register first.',
  })
  async signin(@Body() userData: LoginUserDto) {
    console.log('datos recibidos', userData)
    return this.authService.signin(userData)
  }
}
