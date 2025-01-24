import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ClinicConfigService } from '../config/clinicsConfig.service'
import { ContactsService } from 'src/contacts/contacts.service'

@Injectable()
export class InsuranceService {
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

  

  async getInsuranceCoverageById(
    clinicId: string,
    remoteId: string,
  ): Promise<any> {
    try {
      const contact = await this.contactsService.getContactById(
        clinicId,
        remoteId,
      )

      if (!contact) {
        throw new NotFoundException(
          `Contact with remoteId ${remoteId} not found in clinic ${clinicId}`,
        )
      }

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const insuranceUrl = `${baseUrl}/contacts/${remoteId}/insurance`

      const response = await lastValueFrom(
        this.httpService.get(insuranceUrl, { headers }),
      )

      if (!response.data) {
        throw new HttpException(
          'Insurance record not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      return response.data
    } catch (error) {
      console.error('Error fetching insurance by remote_id:', error)

      if (error.response?.status === 404) {
        throw new HttpException(
          'Insurance record not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      throw new HttpException(
        'Failed to fetch insurance record.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }

  async getInsuranceBenefitsById(
    clinicId: string,
    remoteId: string,
    insuranceId: string,
  ): Promise<any> {
    try {
      const contact = await this.contactsService.getContactById(
        clinicId,
        remoteId,
      )

      if (!contact) {
        throw new NotFoundException(
          `Contact with remoteId ${remoteId} not found in clinic ${clinicId}`,
        )
      }

      const insurance = await this.getInsuranceCoverageById(clinicId, remoteId)

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)

      const benefitsUrl = `${baseUrl}/contacts/${remoteId}/insurance/${insuranceId}/benefits`

      const response = await lastValueFrom(
        this.httpService.get(benefitsUrl, { headers }),
      )

      if (!response.data) {
        throw new HttpException(
          'Insurance Benefits record not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      return response.data
    } catch (error) {
      console.error('Error fetching insurance benefits by remote_id:', error)

      if (error.response?.status === 404) {
        throw new HttpException(
          'Insurance Benefits record not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      throw new HttpException(
        'Failed to fetch insurance benefits record.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }


  async getAllInsuranceCoverage(
    clinicId: string,
  ): Promise<any> {
    try {
      

      const { url: baseUrl, headers } = await this.getRequestConfig(clinicId)
      const remoteId = "-"

      const insuranceUrl = `${baseUrl}/contacts/${remoteId}/insurance`

      const response = await lastValueFrom(
        this.httpService.get(insuranceUrl, { headers }),
      )

      
      if (!response.data) {
        throw new HttpException(
          'Insurances records not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      console.log(response.data);
      

      // Transformar los datos para extraer contactId y carrier_title
      const transformedData = response.data.insurance_coverages.map((item: any) => {
        const contactId = item.contact.split("/").pop(); // Extraer solo el número de la propiedad contact
        const carrier_title = item.insurance_plan.carrier_title;

        return { contactId, carrier_title };
      });

      return transformedData;
    } catch (error) {
      console.error('Error fetching insurances', error)

      if (error.response?.status === 404) {
        throw new HttpException(
          'Insurances records not found.',
          HttpStatus.NOT_FOUND,
        )
      }

      throw new HttpException(
        'Failed to fetch insurances records.',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }




}
