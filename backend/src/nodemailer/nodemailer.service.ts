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
}
