import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ClinicConfigService } from 'src/config/clinicsConfig.service'
import { lastValueFrom } from 'rxjs'
import { CreateAppointmentDto } from './dto/createAppointment.dto'
import { ContactsService } from '../contacts/contacts.service'
import { UpdateAppointmentDto } from './dto/updateAppointment.dto'
import { CancelAppointmentDto } from './dto/cancelAppointment.dto'

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
    private readonly contactsService: ContactsService,
  ) {}

  private async getRequestConfig(clinicId: string) {
    try {
      const { apiUrl, bearerToken, connectorId, consumerId } =
        await this.clinicConfigService.getConfig(clinicId)

      return {
        url: `${apiUrl}`,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${bearerToken}`,
          'connector-id': connectorId,
          'consumer-id': consumerId,
        },
      }
    } catch (error) {
      console.error('Error building request config:', error)
      throw new HttpException(
        'Failed to build request config.',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getAppointments(
    clinicId: string,
    queryParams: {
      page_size?: number
      page_token?: string
      order_by?: string
      filter?: string
    },
  ): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(
        this.httpService.get(`${url}/appointments`, {
          headers,
          params: queryParams,
        }),
      )

      return response.data
    } catch (error) {
      console.error('Error fetching appointments:', error)

      if (error.response?.status === 404) {
        throw new HttpException('Appointments not found.', HttpStatus.NOT_FOUND)
      }

      throw new HttpException(
        'Failed to fetch appointments from the API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async getAppointmentTypes(clinicId: string): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const appointmentTypesUrl = `${url}/appointmenttypes`

      const response = await lastValueFrom(
        this.httpService.get(appointmentTypesUrl, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error fetching appointment types:', error)

      throw new HttpException(
        'Failed to fetch appointment types from API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async getAppointmentResources(clinicId: string): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const appointmentResourcesUrl = `${url}/resources`

      const response = await lastValueFrom(
        this.httpService.get(appointmentResourcesUrl, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error fetching appointment resources:', error)

      throw new HttpException(
        'Failed to fetch appointment resources from API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async getAppointmentById(
    clinicId: string,
    appointmentId: string,
  ): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const appointmentUrl = `${url}/appointments/${appointmentId}`

      // Realizar solicitud HTTP GET
      const response = await lastValueFrom(
        this.httpService.get(appointmentUrl, { headers }),
      )

      if (!response.data) {
        throw new HttpException('Appointment not found.', HttpStatus.NOT_FOUND)
      }

      return response.data
    } catch (error) {
      console.error('Error fetching appointment by ID:', error)

      if (error.response?.status === 404) {
        throw new HttpException('Appointment not found.', HttpStatus.NOT_FOUND)
      }

      throw new HttpException(
        'Failed to fetch appointment from API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async createAppointment(
    clinicId: string,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      let { contact_id, appointment_type_id, providers, operatory } =
        createAppointmentDto

      const contact = await this.contactsService.getContactById(
        clinicId,
        contact_id,
      )

      if (!contact) {
        throw new NotFoundException(
          `Contact with remoteId ${contact_id} not found in clinic ${clinicId}`,
        )
      }
      const resourcesResponse = await this.getAppointmentResources(clinicId)
      const resources = resourcesResponse?.resources || []

      providers.forEach((provider) => {
        const resource = resources.find(
          (res) =>
            res.name === provider.name &&
            res.remote_id === provider.remote_id &&
            res.type === provider.type,
        )

        if (!resource) {
          throw new HttpException(
            `Provider with name "${provider.name}", remote_id "${provider.remote_id}", and type "${provider.type}" does not exist in clinic resources.`,
            HttpStatus.BAD_REQUEST,
          )
        }
      })

      const operatoryExists = resources.some(
        (res) => res.name === operatory && res.type === 'OPERATORY',
      )

      if (!operatoryExists) {
        throw new HttpException(
          `Operatory with name "${operatory}" does not exist in clinic resources.`,
          HttpStatus.BAD_REQUEST,
        )
      }

      if (!isNaN(Number(contact_id))) {
        contact_id = `contacts/${contact_id}`
      }

      const updatedAppointmentDto = { ...createAppointmentDto, contact_id }

      const response = await lastValueFrom(
        this.httpService.post(`${url}/appointments`, updatedAppointmentDto, {
          headers,
        }),
      )

      return response.data
    } catch (error) {
      console.error('Error creating appointment:', error)

      if (error.response?.status === 400) {
        throw new HttpException(
          'Invalid appointment data.',
          HttpStatus.BAD_REQUEST,
        )
      }

      throw new HttpException(
        'Failed to create appointment in the API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async updateAppointment(
    clinicId: string,
    appointmentId: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<any> {
    try {
      await this.getAppointmentById(clinicId, appointmentId)

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const updateMask = Object.keys(updateAppointmentDto).join(',')
      const appointmentUrl = `${baseUrl}/appointments/${appointmentId}?update_mask=${encodeURIComponent(updateMask)}`

      const response = await lastValueFrom(
        this.httpService.patch(appointmentUrl, updateAppointmentDto, {
          headers,
        }),
      )

      return response.data
    } catch (error) {
      console.error('Error updating appointment:', error)

      if (error.response?.status === 404) {
        throw new NotFoundException('Appointment not found.')
      }

      throw new HttpException(
        'Failed to update appointment in the API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async cancelAppointment(
    clinicId: string,
    appointmentId: string,
    cancelAppointmentDto: CancelAppointmentDto,
  ): Promise<any> {
    try {
      await this.getAppointmentById(clinicId, appointmentId)

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const appointmentUrl = `${baseUrl}/appointments/${appointmentId}:cancel`
      console.log('a esta url envio', appointmentUrl)
      console.log('esto estoy enviando', cancelAppointmentDto)

      const response = await lastValueFrom(
        this.httpService.post(appointmentUrl, cancelAppointmentDto, {
          headers,
        }),
      )

      return response.data
    } catch (error) {
      console.error('Error canceling appointment:', error)

      if (error.response?.status === 404) {
        throw new NotFoundException('Appointment not found.')
      }

      throw new HttpException(
        'Failed to cancel appointment in the API.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  
  // async getVisits(
  //   clinicId: string,
  //   contactId: string,
  // ): Promise<{ nextVisit: string | null; lastVisit: string | null }> {
  //   try {
  //     // Obtener datos desde la API externa
  //     const { url, headers } = await this.getRequestConfig(clinicId)
  //     const response = await lastValueFrom(
  //       this.httpService.get(`${url}/appointments`, { headers }),
  //     )
  //     const appointments = response.data.appointments

  //     const now = new Date()

  //     // Filtrar citas relevantes para el paciente
  //     const relevantAppointments = appointments.filter(
  //       (appointment) => appointment.contact.remote_id === contactId,
  //     )

  //     // Variables para almacenar la próxima visita y la última visita
  //     let nextVisit: string | null = null
  //     let lastVisit: string | null = null

  //     // Iterar una sola vez para encontrar nextVisit y lastVisit
  //     relevantAppointments.forEach((appointment) => {
  //       const startTime = new Date(appointment.start_time)

  //       if (
  //         startTime > now &&
  //         !appointment.completed &&
  //         !appointment.cancelled &&
  //         !appointment.broken
  //       ) {
  //         // Si la cita es futura y no está completada, cancelada o rota, verificamos si es la más cercana
  //         if (!nextVisit || startTime < new Date(nextVisit)) {
  //           nextVisit = startTime.toISOString().split('T')[0]
  //         }
  //       } else if (startTime < now && appointment.confirmed) {
  //         // Si la cita es pasada y está confirmada, verificamos si es la más reciente
  //         if (!lastVisit || startTime > new Date(lastVisit)) {
  //           lastVisit = startTime.toISOString().split('T')[0]
  //         }
  //       }
  //     })

  //     return { nextVisit, lastVisit }
  //   } catch (error) {
  //     throw new Error('Error fetching appointments: ' + error.message)
  //   }
  // }


  async getVisits(clinicId: string): Promise<
    {
      contactId: string;
      nextVisit: string | null;
      lastVisit: string | null;
    }[]
  > {
    try {
      // Obtener datos desde la API externa
      const { url, headers } = await this.getRequestConfig(clinicId);
      const response = await lastValueFrom(
        this.httpService.get(`${url}/appointments`, { headers }),
      );
      const appointments = response.data.appointments;

      const now = new Date();

      // Agrupar citas por contact.remote_id con tipos explícitos
      const groupedAppointments: Record<string, any[]> = appointments.reduce(
        (acc: Record<string, any[]>, appointment) => {
          const contactId = appointment.contact.remote_id;

          if (!acc[contactId]) {
            acc[contactId] = [];
          }
          acc[contactId].push(appointment);
          return acc;
        },
        {} as Record<string, any[]>, // Aseguramos que acc comienza con el tipo correcto
      );

      // Procesar los grupos para calcular nextVisit y lastVisit
      const result = Object.entries(groupedAppointments).map(
        ([contactId, relevantAppointments]) => {
          let nextVisit: string | null = null;
          let lastVisit: string | null = null;

          relevantAppointments.forEach((appointment) => {
            const startTime = new Date(appointment.start_time);

            if (
              startTime > now &&
              !appointment.completed &&
              !appointment.cancelled &&
              !appointment.broken
            ) {
              // Si la cita es futura y no está completada, cancelada o rota
              if (!nextVisit || startTime < new Date(nextVisit)) {
                nextVisit = startTime.toISOString().split("T")[0];
              }
            } else if (startTime < now && appointment.confirmed) {
              // Si la cita es pasada y está confirmada
              if (!lastVisit || startTime > new Date(lastVisit)) {
                lastVisit = startTime.toISOString().split("T")[0];
              }
            }
          });

          return {
            contactId,
            nextVisit,
            lastVisit,
          };
        },
      );

      return result;
    } catch (error) {
      throw new Error("Error fetching appointments: " + error.message);
    }
  }





}
