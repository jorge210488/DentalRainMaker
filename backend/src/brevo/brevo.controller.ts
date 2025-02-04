import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiQuery,
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

  @ApiOperation({
    summary: 'Sync SMS history from Brevo and store/update in DB',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    example: '2024-02-01',
    description: 'Start date for SMS history',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    example: '2024-02-07',
    description: 'End date for SMS history',
  })
  @ApiResponse({
    status: 200,
    description: 'SMS history synchronized successfully',
  })
  @ApiResponse({ status: 400, description: 'Error fetching SMS history' })
  @Get('sync-sms')
  async syncSmsHistory(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    console.log('🔹 Sincronizando historial de SMS...')
    return await this.brevoService.syncSmsHistory(startDate, endDate)
  }

  @ApiOperation({ summary: 'Send survey email to patient' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'patient@example.com' },
        given_name: { type: 'string', example: 'John' },
        family_name: { type: 'string', example: 'Doe' },
        wall_start_time: {
          type: 'string',
          example: '2025-02-10 14:30',
          description: 'Appointment date and time',
        },
        clinic_name: { type: 'string', example: 'Sunrise Dental Clinic' },
        survey_url: {
          type: 'string',
          example:
            'https://docs.google.com/forms/d/e/1FAIpQLSfMkVvdMlLEo3RlW_V5OeB7M2vR0lWcK77u4JMBgXdlrvzMvQ/viewform?usp=pp_url&entry.957406845=email&entry.2114435485=appointment_id&entry.1484905053=clinic_name&entry.2057911068=OK',
          description: 'Pre-filled survey form URL',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Survey email sent successfully' })
  @ApiResponse({ status: 400, description: 'Error sending survey email' })
  @Post('send-survey')
  async sendSurveyEmail(@Body() body: any) {
    console.log('📩 Sending survey email:', JSON.stringify(body, null, 2))

    if (
      !body.email ||
      !body.given_name ||
      !body.family_name ||
      !body.wall_start_time ||
      !body.clinic_name ||
      !body.survey_url
    ) {
      throw new BadRequestException('Missing required parameters')
    }

    return await this.brevoService.sendSurveyEmail(
      body.email,
      body.given_name,
      body.family_name,
      body.wall_start_time,
      body.clinic_name,
      body.survey_url,
    )
  }
}
