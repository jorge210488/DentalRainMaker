import { Controller, Post, Body } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { SmsService } from './sms.service'
import { SendSmsDto } from './dtos/sms.dto'

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send an SMS' })
  @ApiResponse({ status: 200, description: 'SMS sent successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @Post('send')
  async sendSms(@Body() sendSmsDto: SendSmsDto): Promise<{ status: string }> {
    await this.smsService.sendSms(sendSmsDto)
    return { status: 'SMS sent successfully' }
  }
}
