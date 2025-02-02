import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  HttpCode,
  Get,
  Query,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import { Public } from '../decorators/public.decorator'
import { UpdateUserDto } from './dto/updateUser.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    console.log('Data received from frontend (signup):', createUserDto)
    const user = await this.authService.signup(createUserDto)

    return {
      message: 'User created successfully',
      user,
    }
  }

  @Public()
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

  @ApiBearerAuth()
  @Get('employeers')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all users that are not of type PATIENT',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users that are not patients.',
  })
  async getNonPatientUsers(@Query('clinic_id') clinic_id: string) {
    console.log('Fetching non-patient users for clinic:', clinic_id)
    return this.authService.getNonPatientUsers(clinic_id)
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update user details',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto)
  }
}
