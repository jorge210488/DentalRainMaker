import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateEmailDto } from './dtos/createEmail.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Nodemailer } from './schemas/nodemailer.schema'
import { ContactsService } from 'src/contacts/contacts.service'

@Injectable()
export class NodemailerService {
  private transporter
  private frontendUrl: string

  constructor(
    @InjectModel(Nodemailer.name)
    private readonly nomailerModel: Model<Nodemailer>,
    private readonly configService: ConfigService,
    private readonly contactsService: ContactsService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    })
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL')
    if (!this.frontendUrl) {
      throw new Error('FRONTEND_URL must be defined in environment variables.')
    }
  }

  async sendRegistrationEmail(
    to: string,
    subject: string,
    name: string,
    type: string,
  ): Promise<void> {
    const path = require('path')
    const fs = require('fs')

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'welcome-email.html',
    )
    if (!fs.existsSync(templatePath)) {
      console.error(
        `El archivo de plantilla no existe en la ruta: ${templatePath}`,
      )
    }

    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')
    const formattedType =
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()

    htmlTemplate = htmlTemplate.replace('{{name}}', name)
    htmlTemplate = htmlTemplate.replace('{{role}}', formattedType)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlTemplate,
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
    } catch (error) {
      console.error('Error enviando email: ', error)
    }
  }

  async sendAppointmentReminder(
    to: string,
    subject: string,
    appointmentDetails: {
      given_name: string
      start_time: string
      end_time: string
      appointment_type_id: string
      provider_name: string
      clinic_name: string
    },
  ): Promise<void> {
    const path = require('path')
    const fs = require('fs')

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'appointment-email.html',
    )

    if (!fs.existsSync(templatePath)) {
      console.error(
        `El archivo de plantilla no existe en la ruta: ${templatePath}`,
      )
      return
    }

    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')

    // Calcular duración en minutos
    const startTime = new Date(appointmentDetails.start_time)
    const endTime = new Date(appointmentDetails.end_time)
    const durationInMinutes = Math.round(
      (endTime.getTime() - startTime.getTime()) / (1000 * 60),
    )

    // Reemplazar los placeholders con los valores de appointmentDetails
    htmlTemplate = htmlTemplate.replace(
      '{{given_name}}',
      appointmentDetails.given_name,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{start_time}}',
      startTime.toLocaleString(),
    )
    htmlTemplate = htmlTemplate.replace(
      '{{duration}}',
      `${durationInMinutes} minutes`,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{appointment_type_id}}',
      appointmentDetails.appointment_type_id,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{provider.name}}',
      appointmentDetails.provider_name,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{clinic_name}}',
      appointmentDetails.clinic_name,
    )

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject,
      html: htmlTemplate,
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log(`Reminder email sent to ${to}. Response: ${info.response}`)
    } catch (error) {
      console.log('Error sending reminder email:', error.message)
    }
  }

  async sendEmail(createEmailDto: CreateEmailDto): Promise<string> {
    const path = require('path')
    const fs = require('fs')

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'general-email.html',
    )

    if (!fs.existsSync(templatePath)) {
      console.error(`The email template does not exist at: ${templatePath}`)
      return
    }

    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')

    // Replace placeholders with values from DTO
    htmlTemplate = htmlTemplate.replace(
      '{{Greetings}}',
      createEmailDto.greetings || 'Hello',
    )
    htmlTemplate = htmlTemplate.replace(
      '{{given_name}}',
      createEmailDto.given_name,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{clinic_name}}',
      createEmailDto.clinic_name,
    )
    htmlTemplate = htmlTemplate.replace('{{Body}}', createEmailDto.body)
    htmlTemplate = htmlTemplate.replace(
      '{{link}}',
      createEmailDto.link || `${this.frontendUrl}`,
    )
    htmlTemplate = htmlTemplate.replace(
      '{{closing}}',
      createEmailDto.closing || 'Best regards',
    )
    htmlTemplate = htmlTemplate.replace(
      '{{signature}}',
      createEmailDto.signature || `The ${createEmailDto.clinic_name} Team`,
    )

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: createEmailDto.to,
      subject: createEmailDto.subject,
      html: htmlTemplate,
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log(
        `Email sent to ${createEmailDto.to}. Response: ${info.response}`,
      )
      return 'Your email was sent successfully.'
    } catch (error) {
      console.error('Error sending email:', error.message)
    }
  }

  async saveEmail(createEmailDto: CreateEmailDto): Promise<Nodemailer> {
    try {
      const emailRecord = new this.nomailerModel(createEmailDto)
      const savedEmail = await emailRecord.save()
      console.log('Email record saved successfully:', savedEmail)
      return savedEmail
    } catch (error) {
      console.error('Error saving email record:', error.message)
      throw new Error('Failed to save email record.')
    }
  }
}
