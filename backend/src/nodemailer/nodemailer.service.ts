import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class NodemailerService {
  private transporter

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    })
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
}
