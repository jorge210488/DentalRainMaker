import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ClinicConfigService } from '../config/clinicsConfig.service'
import { UpdateContactDto } from './dtos/updateContact.dto'
import { CreatePatientDto } from './dtos/createPatient.dto'

@Injectable()
export class ContactsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
  ) {}

  private async getRequestConfig(clinicId: string) {
    try {
      const { apiUrl, bearerToken, connectorId, consumerId } =
        await this.clinicConfigService.getConfig(clinicId)

      return {
        url: `${apiUrl}/contacts`,
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

  async getContacts(clinicId: string): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(
        this.httpService.get(url, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error fetching contacts from Kolla:', error)

      throw new HttpException(
        'Failed to fetch contacts from Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async createContact(clinicId: string, contactData: any): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(
        this.httpService.post(url, contactData, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error creating contact in Kolla:', error)

      throw new HttpException(
        'Failed to create contact in Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async getContactById(clinicId: string, remoteId: string): Promise<any> {
    try {
      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const contactUrl = `${baseUrl}/${remoteId}`

      const response = await lastValueFrom(
        this.httpService.get(contactUrl, { headers }),
      )

      if (!response.data) {
        throw new HttpException('Contact not found.', HttpStatus.NOT_FOUND)
      }

      return response.data
    } catch (error) {
      console.error('Error fetching contact by remote_id:', error)

      if (error.response?.status === 404) {
        throw new HttpException('Contact not found.', HttpStatus.NOT_FOUND)
      }

      throw new HttpException(
        'Failed to fetch contact from Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async updateContact(
    clinicId: string,
    remoteId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<any> {
    try {
      // Reutilizar getContactById para verificar si el contacto existe
      await this.getContactById(clinicId, remoteId)

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      // Construir el update_mask desde el DTO
      const updateMask = Object.keys(updateContactDto).join(',')
      const contactUrl = `${baseUrl}/${remoteId}?update_mask=${encodeURIComponent(updateMask)}`

      // Enviar la solicitud PATCH a la API
      const response = await lastValueFrom(
        this.httpService.patch(contactUrl, updateContactDto, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error updating contact:', error)

      if (error.response?.status === 404) {
        throw new HttpException('Contact not found.', HttpStatus.NOT_FOUND)
      }

      throw new HttpException(
        'Failed to update contact in Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async createPatient(
    clinicId: string,
    createPatientDto: CreatePatientDto,
  ): Promise<any> {
    try {
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(
        this.httpService.post(url, createPatientDto, { headers }),
      )

      return response.data
    } catch (error) {
      console.error('Error creating patient in Kolla:', error)

      if (error.response?.status === 400) {
        throw new HttpException(
          'Invalid patient data provided.',
          HttpStatus.BAD_REQUEST,
        )
      }

      throw new HttpException(
        'Failed to create patient in Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }
}
