import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationsService } from '../notifications/notifications.service'
import { CreateNotificationDto } from '../notifications/dtos/createNotification.dto'
import { NotificationType } from '../notifications/enums/notifications.enum'
import { ContactsService } from '../contacts/contacts.service'
import { Clinic, ClinicDocument } from '../clinics/schemas/clinic.schema'
import { AppointmentsService } from 'src/appointments/appointments.service'
import { NodemailerService } from 'src/nodemailer/nodemailer.service'
import { SmsService } from 'src/sms/sms.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)
  private readonly frontendUrl: string

  constructor(
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<ClinicDocument>,
    private readonly notificationsService: NotificationsService,
    private readonly contactsService: ContactsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly nodemailerService: NodemailerService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL')
    if (!this.frontendUrl) {
      this.logger.error(
        'FRONTEND_URL is not defined in the environment variables.',
      )
      throw new Error('FRONTEND_URL must be defined in environment variables.')
    }
  }

  // Método para obtener todas las clínicas
  private async getAllClinics(): Promise<ClinicDocument[]> {
    const clinics = await this.clinicModel.find().exec()
    if (!clinics.length) {
      this.logger.log('No clinics found.')
      return []
    }
    this.logger.log(`Found ${clinics.length} clinics.`)
    return clinics
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async executeProfileCompletionTask(): Promise<void> {
    this.logger.log('Executing profile completion task...')

    // Obtener todas las clínicas
    const clinics = await this.getAllClinics()
    if (!clinics.length) return

    for (const clinic of clinics) {
      try {
        // Obtener todos los contactos de la clínica
        const response = await this.contactsService.getContacts(clinic._id)
        if (!response || !response.contacts || response.contacts.length === 0) {
          this.logger.log(`No contacts found for clinic ${clinic._id}`)
          continue
        }

        const contacts = response.contacts
        this.logger.log(
          `Found ${contacts.length} contacts for clinic ${clinic._id}`,
        )

        // Filtrar contactos con perfiles incompletos
        const incompleteProfiles = contacts.filter((contact) => {
          return (
            !contact.addresses ||
            contact.addresses.length === 0 ||
            !contact.phone_numbers ||
            contact.phone_numbers.length === 0 ||
            !contact.gender ||
            !contact.birth_date ||
            !contact.additional_data?.ImageFolder
          )
        })

        if (!incompleteProfiles.length) {
          this.logger.log(
            `No users with incomplete profiles found for clinic ${clinic._id}`,
          )
          continue
        }

        this.logger.log(
          `Found ${incompleteProfiles.length} users with incomplete profiles for clinic ${clinic._id}`,
        )

        // Crear y enviar notificaciones
        for (const contact of incompleteProfiles) {
          const notificationDto: CreateNotificationDto = {
            remote_id: contact.remote_id,
            clinic_id: clinic._id,
            notification: {
              title: 'Complete your profile!',
              body: 'Your profile is incomplete. Please update it to enjoy full features.',
              image:
                'https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png',
            },
            data: {
              type: NotificationType.REMINDER,
            },
          }

          try {
            // Enviar notificación push
            await this.notificationsService.sendPushNotification(
              notificationDto,
            )

            // Guardar la notificación en la base de datos
            await this.notificationsService.createNotification(
              notificationDto,
              true,
            )

            this.logger.log(`Notification sent to contact ${contact.remote_id}`)
          } catch (error) {
            this.logger.error(
              `Failed to send notification to contact ${contact.remote_id}: ${error.message}`,
            )
          }
        }
      } catch (error) {
        this.logger.error(
          `Failed to process clinic ${clinic._id}: ${error.message}`,
        )
      }
    }

    this.logger.log('Profile completion task completed.')
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON) // Se ejecutará diariamente al mediodía
  async executeAppointmentsTask(): Promise<void> {
    this.logger.log(
      "Executing task to fetch tomorrow's appointments and send notifications...",
    )

    const clinics = await this.getAllClinics()
    if (!clinics.length) return

    for (const clinic of clinics) {
      try {
        const now = new Date()

        // Calcular el rango para "mañana" en UTC
        const startOfTomorrow = new Date()
        startOfTomorrow.setUTCDate(now.getUTCDate() + 1)
        startOfTomorrow.setUTCHours(0, 0, 0, 0)

        const endOfTomorrow = new Date(startOfTomorrow)
        endOfTomorrow.setUTCHours(23, 59, 59, 999)

        // Formatear las fechas como 'yyyy-mm-ddTHH:mm:ssZ'
        const formatToISO = (date: Date): string => date.toISOString()

        const filter = `start_time > '${formatToISO(
          startOfTomorrow,
        )}' AND start_time < '${formatToISO(endOfTomorrow)}'`

        this.logger.log(`Generated filter for clinic ${clinic._id}: ${filter}`)

        // Llamar al método del servicio de citas
        const appointmentsResponse =
          await this.appointmentsService.getAppointments(clinic._id, { filter })

        const appointments = appointmentsResponse?.appointments || []
        this.logger.log(
          `Fetched ${appointments.length} appointments for clinic ${clinic._id}.`,
        )

        if (!appointments.length) continue

        // Enviar notificaciones para cada cita
        for (const appointment of appointments) {
          const contact = appointment.contact

          if (!contact || !contact.remote_id) {
            this.logger.warn(
              `No contact information found for appointment ${appointment.name}.`,
            )
            continue
          }

          const notificationDto: CreateNotificationDto = {
            remote_id: contact.remote_id,
            clinic_id: clinic._id,
            notification: {
              title: 'Reminder for your appointment tomorrow!',
              body: `You have an appointment scheduled on ${clinic.clinic_name} tomorrow. Please make sure to be on time.`,
              image:
                'https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png',
            },
            data: {
              type: NotificationType.REMINDER,
            },
            webpush: {
              fcm_options: {
                link: `${this.frontendUrl}/patientDashboard/appointments`,
              },
            },
          }

          try {
            // Enviar notificación push
            await this.notificationsService.sendPushNotification(
              notificationDto,
            )

            // Guardar la notificación en la base de datos
            await this.notificationsService.createNotification(
              notificationDto,
              true,
            )

            this.logger.log(
              `Notification sent to contact ${contact.remote_id} for appointment ${appointment.name}.`,
            )
          } catch (error) {
            this.logger.error(
              `Failed to send notification to contact ${contact.remote_id} for appointment ${appointment.name}: ${error.message}`,
            )
          }
        }
        for (const appointment of appointments) {
          const contact = appointment.contact

          if (!contact || !contact.remote_id) {
            this.logger.warn(
              `No contact information found for appointment ${appointment.name}.`,
            )
            continue
          }

          try {
            // Obtener información del contacto por remote_id
            const contactDetails = await this.contactsService.getContactById(
              clinic._id,
              contact.remote_id,
            )

            if (!contactDetails || !contactDetails.primary_email_address) {
              this.logger.warn(
                `No primary email found for contact ${contact.remote_id}.`,
              )
              continue
            }

            // Enviar el SMS CON TWILIO
            const smsTo = contactDetails.phone_numbers?.[0]?.number
            if (!smsTo) {
              this.logger.warn(
                `No phone number found for contact ${contactDetails.given_name}.`,
              )
              return
            }

            const smsBody = `Hello ${contactDetails.given_name}, this is a reminder for your appointment at ${clinic.clinic_name} for tomorrow.`
            const sendSmsDto = {
              remote_id: contactDetails.remote_id,
              clinic_id: clinic._id,
              clinic_name: clinic.clinic_name,
              to: smsTo,
              body: smsBody,
            }

            await this.smsService.sendSms(sendSmsDto)

            // ENVIO DE CORREO CON NODEMAILER
            const emailTo = contactDetails.primary_email_address
            const subject = 'Reminder: Your Appointment Tomorrow'

            const appointmentDetails = {
              given_name: contactDetails.given_name,
              start_time: appointment.start_time,
              end_time: appointment.end_time,
              appointment_type_id: appointment.appointment_type_id,
              provider_name:
                appointment.providers?.[0]?.name || 'No provider available',
              clinic_name: clinic.clinic_name,
            }

            console.log('body del correo', appointmentDetails)
            await this.nodemailerService.sendAppointmentReminder(
              emailTo,
              subject,
              appointmentDetails,
            )

            this.logger.log(
              `Email reminder sent to ${emailTo} for appointment ${appointment.name}.`,
            )
          } catch (error) {
            this.logger.error(
              `Error processing contact ${contact.remote_id} for appointment ${appointment.name}: ${error.message}`,
            )
          }
        }
      } catch (error) {
        this.logger.error(
          `Error processing appointments for clinic ${clinic._id}: ${error.message}`,
        )
      }
    }
  }
}
