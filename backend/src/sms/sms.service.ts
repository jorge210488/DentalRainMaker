import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as Twilio from 'twilio'
import { ConfigService } from '@nestjs/config'
import { SendSmsDto } from './dtos/sms.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Sms } from './schemas/sms.schema'
import { ContactsService } from 'src/contacts/contacts.service'

@Injectable()
export class SmsService {
  private readonly client: Twilio.Twilio

  constructor(
    @InjectModel(Sms.name)
    private readonly smsModel: Model<Sms>,
    private readonly configService: ConfigService,
    private readonly contactsService: ContactsService,
  ) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID')
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN')

    if (!accountSid || !authToken) {
      throw new Error(
        'Twilio credentials are not set in the environment variables.',
      )
    }

    this.client = Twilio(accountSid, authToken)
  }

  async sendSms(sendSmsDto: SendSmsDto): Promise<void> {
    const { to, body } = sendSmsDto
    const messagingServiceSid = this.configService.get<string>(
      'TWILIO_MESSAGING_SERVICE_SID',
    )

    if (!messagingServiceSid) {
      throw new Error(
        'Twilio Messaging Service SID is not set in the environment variables.',
      )
    }

    try {
      const message = await this.client.messages.create({
        to,
        body,
        messagingServiceSid,
      })
      console.log(`Message sent successfully: ${message.sid}`)

      const newSms = new this.smsModel(sendSmsDto)
      await newSms.save()
    } catch (error) {
      console.error('Failed to send SMS:', error.message)
      throw new InternalServerErrorException(
        'SMS delivery failed. Please try again later.',
      )
    }
  }
}
