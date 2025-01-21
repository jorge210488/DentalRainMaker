import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { last, lastValueFrom } from 'rxjs';
import { ClinicConfigService } from '../config/clinicsConfig.service'
import { AppointmentsService } from 'src/appointments/appointments.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
    private readonly appointmentsService: AppointmentsService
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

  async getPatients(clinicId: string): Promise<any> {

    try {
      // Obtener datos de la API externa
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(this.httpService.get(url, { headers }));
      const contacts = response.data.contacts;  

      // Filtrar los pacientes y calcular la edad
      const patients = contacts
        .filter(contact => contact.type === 'PATIENT') // Filtrar por tipo "patient"
        .map((patient) => ({
          ...patient,
          age: this.calculateAge(patient.birth_date), // Calcular la edad
          nextVisit: null,
          lastVisit: null,
        }));

      // Obtener visitas para cada paciente
      const patientsWithVisits = await Promise.all(
      patients.map(async (patient) => {
        const { nextVisit, lastVisit } = await this.appointmentsService.getVisits(clinicId, patient.remote_id);
        return {
          ...patient,
          nextVisit,
          lastVisit,
        };
        }),
      );  

      return patientsWithVisits;
    } catch (error) {
      throw new Error('Error fetching patients: ' + error.message);
    }
  }


  // Método para calcular la edad a partir de la fecha de nacimiento
  private calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Ajustar si el cumpleaños no ha ocurrido aún este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }
}
