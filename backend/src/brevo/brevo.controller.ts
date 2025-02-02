import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
} from '@nestjs/swagger'
import { BrevoService } from './brevo.service'
import { CreateBrevoCompanyDto } from './dto/createBrevoCompany.dto'
import { CreateBrevoContactDto } from './dto/createBrevoContact.dto'
import { Public } from '../decorators/public.decorator'

@ApiBearerAuth()
@ApiTags('brevo')
@Controller('brevo')
export class BrevoController {
  constructor(private readonly brevoService: BrevoService) {}

  @ApiOperation({ summary: 'Send a marketing email using a template' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@example.com' },
        templateId: { type: 'number', example: 1 },
        params: {
          type: 'object',
          example: { given_name: 'John', family_name: 'Doe' },
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

  @ApiOperation({ summary: 'Register a new company in Brevo and save it' })
  @ApiBody({ type: CreateBrevoCompanyDto })
  @ApiResponse({ status: 201, description: 'Company registered successfully' })
  @ApiResponse({ status: 400, description: 'Error registering company' })
  @Post('register-company')
  async registerCompany(@Body() createBrevoCompanyDto: CreateBrevoCompanyDto) {
    console.log(
      '🔹 Cuerpo recibido en el controlador:',
      JSON.stringify(createBrevoCompanyDto, null, 2),
    )
    return await this.brevoService.registerCompany(createBrevoCompanyDto)
  }

  @ApiOperation({ summary: 'Register a new contact in Brevo' })
  @ApiBody({ type: CreateBrevoContactDto })
  @ApiResponse({ status: 201, description: 'Contact registered successfully' })
  @ApiResponse({ status: 400, description: 'Error registering contact' })
  @Post('register-contact')
  async registerContact(@Body() createBrevoContactDto: CreateBrevoContactDto) {
    console.log(
      '🔹 Cuerpo recibido en el controlador:',
      JSON.stringify(createBrevoContactDto, null, 2),
    )

    try {
      return await this.brevoService.registerContact(createBrevoContactDto)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Public()
  @ApiExcludeEndpoint()
  @Post('email-campaign')
  async handleBrevoWebhook(@Body() body: any) {
    console.log('📩 Webhook recibido de Brevo:', JSON.stringify(body, null, 2))

    if (!body || !body.event) {
      throw new BadRequestException('Invalid webhook data')
    }

    return await this.brevoService.processBrevoWebhook(body)
  }
}
