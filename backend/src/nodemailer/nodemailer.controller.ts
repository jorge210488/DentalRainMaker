import {
  Controller,
  Get,
  Query,
  Post,
  Patch,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'
import { NodemailerService } from './nodemailer.service'
import { CreateEmailDto } from './dtos/createEmail.dto'

@ApiBearerAuth()
@ApiTags('nodemailer')
@Controller('nodemailer')
@UseGuards(RolesGuard, PermissionsGuard)
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @ApiOperation({ summary: 'Send a new email' })
  @Post('send')
  async sendEmail(@Body() createEmailDto: CreateEmailDto): Promise<void> {
    console.log('NodemailerController: Received DTO', createEmailDto)

    // Call the service method to send the email
    await this.nodemailerService.sendEmail(createEmailDto)

    await this.nodemailerService.saveEmail(createEmailDto)
  }
}
