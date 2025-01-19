import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClinicsService } from '../clinics/clinics.service'

@Injectable()
export class ClinicConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly clinicsService: ClinicsService,
  ) {}

  async getConfig(clinicId: string) {
    // Buscar la clínica por su ID
    const clinic = await this.clinicsService.findById(clinicId)
    const clinicName = clinic.clinic_name.toUpperCase().replace(/\s+/g, '_')

    // Configuración mapeada según el nombre de la clínica
    const config = {
      UNIFY_DENTAL: {
        apiUrl: this.configService.get<string>('UNIFY_DENTAL_KOLLA_API_URL'),
        bearerToken: this.configService.get<string>(
          'UNIFY_DENTAL_KOLLA_BEARER_TOKEN',
        ),
        connectorId: this.configService.get<string>(
          'UNIFY_DENTAL_KOLLA_CONNECTOR_ID',
        ),
        consumerId: this.configService.get<string>(
          'UNIFY_DENTAL_KOLLA_CONSUMER_ID',
        ),
      },
      ANOTHER_CLINIC: {
        apiUrl: this.configService.get<string>('ANOTHER_CLINIC_KOLLA_API_URL'),
        bearerToken: this.configService.get<string>(
          'ANOTHER_CLINIC_KOLLA_BEARER_TOKEN',
        ),
        connectorId: this.configService.get<string>(
          'ANOTHER_CLINIC_KOLLA_CONNECTOR_ID',
        ),
        consumerId: this.configService.get<string>(
          'ANOTHER_CLINIC_KOLLA_CONSUMER_ID',
        ),
      },
    }

    // Validar si existe la configuración para el nombre de la clínica
    if (!config[clinicName]) {
      throw new HttpException(
        `Configuration for clinic ${clinicName} not found.`,
        HttpStatus.BAD_REQUEST,
      )
    }

    return config[clinicName]
  }
}
