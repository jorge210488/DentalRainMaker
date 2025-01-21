import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ClinicConfigService } from "src/config/clinicsConfig.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class InsuranceService {
    constructor(
        private readonly httpService: HttpService,
        private readonly clinicConfigService: ClinicConfigService,
    ) {}

    private async getRequestConfig(clinicId: string, contact: string) {
          try {
            const { apiUrl, bearerToken, connectorId, consumerId } =
              await this.clinicConfigService.getConfig(clinicId)
      
            return {
              url: `${apiUrl}/contacts/${contact}/insurance`,
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
    

    async getInsurance(
        clinicId: string,
        contact: string,
    ): Promise<any> {
        try {
            const { url, headers } = await this.getRequestConfig(clinicId, contact);
            const response = await lastValueFrom(this.httpService.get(url, { headers }));
            const insurance = response.data.insurance_coverages;
            return  insurance;
        } catch (error) {
            console.error('Error getting insurance:', error);
            throw new HttpException(
                'Failed to get insurance.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}