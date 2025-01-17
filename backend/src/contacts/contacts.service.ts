import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ClinicConfigService } from '../config/clinicsConfig.service'

@Injectable()
export class ContactsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService, // Inyección del servicio
  ) {}

  async getContacts(clinicId: string): Promise<any> {
    try {
      // console.log('Clinic ID recibido:', clinicId)

      const { apiUrl, bearerToken, connectorId, consumerId } =
        await this.clinicConfigService.getConfig(clinicId)

      // console.log('Configuración de la clínica:', {
      //   apiUrl,
      //   bearerToken,
      //   connectorId,
      //   consumerId,
      // })

      const url = `${apiUrl}/contacts`
      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${bearerToken}`,
        'connector-id': connectorId,
        'consumer-id': consumerId,
      }

      console.log('URL construida:', url)
      console.log('Headers construidos:', headers)

      const response = await lastValueFrom(
        this.httpService.get(url, { headers }),
      )

      // console.log('Respuesta de Kolla:', response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching contacts from Kolla:', error)

      throw new HttpException(
        'Failed to fetch contacts from Kolla.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }
}
