import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationsService } from '../notifications/notifications.service'
import { CreateNotificationDto } from '../notifications/dtos/createNotification.dto'
import { NotificationType } from '../notifications/enums/notifications.enum'
import { ContactsService } from '../contacts/contacts.service'
import { Clinic, ClinicDocument } from '../clinics/schemas/clinic.schema'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<ClinicDocument>,
    private readonly notificationsService: NotificationsService,
    private readonly contactsService: ContactsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Ejecuta la tarea diariamente a medianoche
  async executeProfileCompletionTask(): Promise<void> {
    this.logger.log('Executing profile completion task...')

    // Obtener todas las clínicas
    const clinics = await this.clinicModel.find().exec()
    if (!clinics.length) {
      this.logger.log('No clinics found.')
      return
    }

    this.logger.log(`Found ${clinics.length} clinics.`)

    for (const clinic of clinics) {
      try {
        // Obtener todos los contactos de la clínica
        const response = await this.contactsService.getContacts(clinic._id)
        // console.log(contacts)
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
}
