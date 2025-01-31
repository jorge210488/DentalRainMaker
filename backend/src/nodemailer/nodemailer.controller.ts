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
import { BrevoService } from './brevo.service'

@ApiBearerAuth()
@ApiTags('nodemailer')
@Controller('nodemailer')
@UseGuards(RolesGuard, PermissionsGuard)
export class NodemailerController {
  constructor(
    private readonly nodemailerService: NodemailerService,
    private readonly brevoService: BrevoService,
  ) {}

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

  @ApiOperation({ summary: 'Send a marketing email using a template' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@example.com' },
        templateId: { type: 'number', example: 1 },
        params: {
          type: 'object',
          example: { name: 'John Doe', appointmentDate: '2024-07-01' },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Error sending email' })
  @Post('send-marketing')
  async sendMarketingEmail(
    @Body() body: { email: string; templateId: number; params: any },
  ) {
    console.log(
      '🔹 Cuerpo recibido en el controlador:',
      JSON.stringify(body, null, 2),
    )
    return await this.brevoService.sendTemplateEmail(
      body.email,
      body.templateId,
      body.params,
    )
  }

  // @ApiOperation({ summary: 'Add a new contact to Brevo' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       email: { type: 'string', example: 'contact@example.com' },
  //       firstName: { type: 'string', example: 'John' },
  //       lastName: { type: 'string', example: 'Doe' },
  //     },
  //   },
  // })
  // @ApiResponse({ status: 201, description: 'Contact added successfully' })
  // @ApiResponse({ status: 400, description: 'Error adding contact' })
  // @Post('add-contact')
  // async addContact(
  //   @Body() body: { email: string; firstName: string; lastName: string },
  // ) {
  //   return await this.brevoService.addContact(
  //     body.email,
  //     body.firstName,
  //     body.lastName,
  //   )
  // }
}
