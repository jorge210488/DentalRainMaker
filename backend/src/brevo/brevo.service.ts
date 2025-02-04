import axios from 'axios'
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  BrevoCompany,
  BrevoCompanyDocument,
} from './schemas/brevoCompany.schema'
import { CreateBrevoCompanyDto } from './dto/createBrevoCompany.dto'
import { CreateBrevoContactDto } from './dto/createBrevoContact.dto'
import {
  BrevoWebhookEvent,
  BrevoWebhookEventDocument,
} from './schemas/brevoWebhookEvent.schema'
import { BrevoSms, BrevoSmsDocument } from './schemas/brevoSms.schema'

@Injectable()
export class BrevoService {
  private readonly logger = new Logger(BrevoService.name)
  private readonly apiKey: string
  private readonly brevoBaseUrl = 'https://api.brevo.com/v3/companies'
  private readonly smtpBaseUrl = 'https://api.brevo.com/v3/smtp/email'
  private readonly brevoContactUrl = 'https://api.brevo.com/v3/contacts'
  private readonly brevoSmsUrl =
    'https://api.brevo.com/v3/transactionalSMS/statistics/reports'

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(BrevoCompany.name)
    private brevoCompanyModel: Model<BrevoCompanyDocument>,
    @InjectModel(BrevoWebhookEvent.name)
    private readonly brevoWebhookEventModel: Model<BrevoWebhookEventDocument>,
    @InjectModel(BrevoSms.name)
    private readonly brevoSmsModel: Model<BrevoSmsDocument>,
  ) {
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

  async registerCompany(createBrevoCompanyDto: CreateBrevoCompanyDto) {
    const { clinic_id, clinic_name, clinic_website } = createBrevoCompanyDto

    // Verificar si la compañía ya está registrada
    const existingCompany = await this.brevoCompanyModel.findOne({ clinic_id })
    if (existingCompany) {
      throw new BadRequestException(
        `Company with clinic_id ${clinic_id} already exists.`,
      )
    }

    try {
      // Datos para enviar a la API de Brevo
      const payload = {
        name: clinic_name,
        website: clinic_website || '',
      }

      console.log(
        '🔹 Enviando datos a Brevo:',
        JSON.stringify(payload, null, 2),
      )

      // Enviar solicitud a Brevo
      const response = await axios.post(this.brevoBaseUrl, payload, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      const company_id = response.data.id
      console.log(`✅ Compañía registrada en Brevo con ID: ${company_id}`)

      // Guardar en MongoDB
      const newCompany = new this.brevoCompanyModel({
        company_id,
        clinic_id,
        clinic_name,
        clinic_website,
      })
      await newCompany.save()

      return {
        message: 'Company registered successfully',
        company: newCompany,
      }
    } catch (error) {
      console.error(
        '❌ Error al registrar compañía en Brevo:',
        error.response?.data || error.message,
      )
      throw new BadRequestException('Failed to register company in Brevo.')
    }
  }

  async registerContact(createBrevoContactDto: CreateBrevoContactDto) {
    const {
      given_name,
      family_name,
      primary_email_address,
      phone_number,
      clinic_id,
    } = createBrevoContactDto

    // Buscar la compañía en MongoDB por el clinic_id
    const company = await this.brevoCompanyModel.findOne({ clinic_id })
    if (!company) {
      throw new NotFoundException(
        `No Brevo company found for clinic_id: ${clinic_id}`,
      )
    }

    const payload = {
      email: primary_email_address,
      attributes: {
        FIRSTNAME: given_name,
        LASTNAME: family_name,
        CLINICNAME: company.clinic_name,
        SMS: phone_number,
        WHATSAPP: phone_number,
      },
      listIds: [7],
      companyIds: [company.company_id],
      updateEnabled: true, // 📌 Si el contacto ya existe, lo actualiza en lugar de fallar
    }

    // console.log(
    //   '🔹 Enviando contacto a Brevo:',
    //   JSON.stringify(payload, null, 2),
    // )

    try {
      const response = await axios.post(this.brevoContactUrl, payload, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      // console.log(
      //   `✅ Contacto registrado en Brevo con email: ${primary_email_address}`,
      //   response.data,
      // )
      return {
        message: 'Contact registered successfully',
        contact: response.data,
      }
    } catch (error) {
      // console.error(
      //   '❌ Error al registrar contacto en Brevo:',
      //   error.response?.data || error.message,
      // )
      throw new BadRequestException('Failed to register contact in Brevo.')
    }
  }

  async processBrevoWebhook(data: any) {
    try {
      const event = new this.brevoWebhookEventModel({
        eventId: data.id || null,
        email: data.email || null,
        eventType: data.event,
        timestamp: data.date || new Date(),
        metadata: data,
      })

      await event.save()
      this.logger.log(`✅ Webhook guardado: ${JSON.stringify(data)}`)

      return { message: 'Webhook processed successfully', event }
    } catch (error) {
      this.logger.error('❌ Error procesando el webhook:', error)
      throw new Error('Failed to process Brevo webhook')
    }
  }

  async syncSmsHistory(startDate?: string, endDate?: string) {
    try {
      let url = this.brevoSmsUrl
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`
      }

      const response = await axios.get(url, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      // 📌 Validar si hay mensajes en la respuesta
      const smsList = response.data.messages || []

      if (smsList.length === 0) {
        console.log('⚠ No hay SMS en el rango de fechas proporcionado.')
        return { message: 'No SMS found for the given period.', count: 0 }
      }

      for (const sms of smsList) {
        await this.brevoSmsModel.updateOne(
          { messageId: sms.messageId }, // 📌 Si ya existe, actualiza el estado
          {
            $set: {
              recipient: sms.recipient,
              status: sms.status,
              content: sms.content,
              sentAt: sms.sentAt ? new Date(sms.sentAt) : null,
            },
          },
          { upsert: true }, // 📌 Crea el registro si no existe
        )
      }

      console.log(`✅ ${smsList.length} SMS sincronizados en la base de datos.`)
      return { message: 'SMS history synchronized', count: smsList.length }
    } catch (error) {
      console.error(
        '❌ Error al obtener el historial de SMS:',
        error.response?.data || error.message,
      )
      throw new BadRequestException('Failed to fetch SMS history from Brevo.')
    }
  }

  async sendSurveyEmail(
    email: string,
    given_name: string,
    family_name: string,
    wall_start_time: string,
    clinic_name: string,
    survey_url: string,
  ) {
    try {
      const payload = {
        sender: { email: 'jorge.martinezgarcia.jam1@gmail.com' }, // 📌 Cambia por tu email autorizado en Brevo
        to: [{ email }],
        templateId: 11, // 📌 ID del template en Brevo
        params: {
          given_name,
          family_name,
          wall_start_time,
          clinic_name,
          url: survey_url, // 📌 Se pasa el link de la encuesta
        },
      }

      console.log(
        '📩 Enviando email de encuesta:',
        JSON.stringify(payload, null, 2),
      )

      const response = await axios.post(this.smtpBaseUrl, payload, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      console.log(`✅ Encuesta enviada a ${email}`, response.data)
      return response.data
    } catch (error) {
      console.error(
        '❌ Error al enviar encuesta:',
        error.response?.data || error.message,
      )
      throw new Error('Failed to send survey email.')
    }
  }
}
