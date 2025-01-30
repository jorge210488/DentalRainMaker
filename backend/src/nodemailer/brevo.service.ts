import axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BrevoService {
  private readonly apiKey: string
  private readonly smtpBaseUrl = 'https://api.brevo.com/v3/smtp/email'

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('BREVO_API_KEY')
    if (!this.apiKey) {
      throw new Error('BREVO_API_KEY is not set in environment variables')
    }
  }

  async sendTemplateEmail(
    to: string,
    templateId: number,
    params: Record<string, any>,
  ) {
    try {
      const payload = {
        sender: { email: 'jorge.martinezgarcia.jam1@gmail.com' }, // 🔹 Email autorizado en Brevo
        to: [{ email: to }],
        templateId,
        params, // 🔹 Ahora los parámetros se envían sin modificar su nombre
      }

      console.log('🔹 Enviando email con:', JSON.stringify(payload, null, 2))

      const response = await axios.post(this.smtpBaseUrl, payload, {
        headers: {
          'api-key': this.apiKey, // 🔹 Se usa "api-key", NO "Bearer"
          'Content-Type': 'application/json',
        },
      })

      console.log(`✅ Email enviado a ${to}`, response.data)
      return response.data
    } catch (error) {
      console.error(
        '❌ Error al enviar email:',
        error.response?.data || error.message,
      )
      throw new Error('Failed to send template email.')
    }
  }
}
