import { Injectable } from '@nestjs/common'
import * as Twilio from 'twilio'
import { ConfigService } from '@nestjs/config'
import { SendSmsDto } from './dtos/sms.dto'

@Injectable()
export class SmsService {
  private readonly client: Twilio.Twilio

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID')
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN')
    this.client = Twilio(accountSid, authToken)
  }

  async sendSms(sendSmsDto: SendSmsDto): Promise<void> {
    const { to, body } = sendSmsDto
    const messagingServiceSid = this.configService.get<string>(
      'TWILIO_MESSAGING_SERVICE_SID',
    )

    try {
      const message = await this.client.messages.create({
        to,
        body,
        messagingServiceSid,
      })
      console.log(`Message sent successfully: ${message.sid}`)
    } catch (error) {
      console.error('Failed to send SMS:', error.message)
      throw new Error('SMS delivery failed')
    }
  }
}
