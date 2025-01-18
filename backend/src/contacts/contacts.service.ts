import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ClinicConfigService } from '../config/clinicsConfig.service'

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
}
