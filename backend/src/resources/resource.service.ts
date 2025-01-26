import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ClinicConfigService } from '../config/clinicsConfig.service'

@Injectable()
export class ResourcesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
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

  async getResources(clinicId: string): Promise<any> {
    try {
      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const Url = `${baseUrl}/resources`

      const response = await lastValueFrom(
        this.httpService.get(Url, { headers }),
      )

      if (!response.data) {
        throw new HttpException(
          'Resources records not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      return response.data.resources
    } catch (error) {
      console.error('Error fetching resources', error)

      if (error.response?.status === 404) {
        throw new HttpException(
          'Resources records not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      throw new HttpException(
        'Failed to fetch resources records.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }
}
