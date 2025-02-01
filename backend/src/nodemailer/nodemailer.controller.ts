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
  ApiBody,
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
  async sendEmail(
    @Body() createEmailDto: CreateEmailDto,
  ): Promise<{ status: string }> {
    console.log('NodemailerController: Received DTO', createEmailDto)

    try {
      // Call the service method to send the email
      const sendResponse =
        await this.nodemailerService.sendEmail(createEmailDto)

      // Save the email record
      await this.nodemailerService.saveEmail(createEmailDto)

      // Return a proper JSON object
      console.log(sendResponse)
      return sendResponse // Ensure consistent response format
    } catch (error) {
      console.error('Error in NodemailerController:', error.message)
      throw new Error('Failed to send or save the email.')
    }
  }
}
