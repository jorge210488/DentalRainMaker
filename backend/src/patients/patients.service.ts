import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { last, lastValueFrom } from 'rxjs';
import { ClinicConfigService } from '../config/clinicsConfig.service'
import { AppointmentsService } from 'src/appointments/appointments.service';
import { InsuranceService } from 'src/insurance/insurance.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
    private readonly appointmentsService: AppointmentsService,
    private readonly insuranceService: InsuranceService,
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
      // const patients = contacts
      //   .filter(contact => contact.type === 'PATIENT') // Filtrar por tipo "patient"
      //   .map((patient) => ({
      //     ...patient,
      //     fullname: `${patient.given_name} ${patient.family_name}`,
      //     age: this.calculateAge(patient.birth_date), // Calcular la edad
      //     nextVisit: null,
      //     lastVisit: null,
      //     insurance: null,
      //     activeTreatment: false,
      //   }));

      const listVisitsPatients = await this.appointmentsService.getVisits(clinicId);  
      //   const listInsurancePatients = await this.insuranceService.getAllInsuranceCoverage(clinicId);

      const visitsMap: Record<string, { contactId: string; nextVisit: string | null; lastVisit: string | null }> = Object.fromEntries(
        listVisitsPatients.map((visit) => [visit.contactId, visit])
      );
      
      const patients = contacts
        .filter((contact) => contact.type === 'PATIENT')
        .map((patient) => {
          const visitData = visitsMap[patient.remote_id];
      
          return {
            ...patient,
            fullname: `${patient.given_name} ${patient.family_name}`,
            age: this.calculateAge(patient.birth_date),
            nextVisit: visitData?.nextVisit || null,
            lastVisit: visitData?.lastVisit || null,
            insurance: null,
            activeTreatment: false,
          };
        });
      
      return patients;
      
      // // Obtener seguro y visitas para cada paciente
      // const patientsWithVisits = await Promise.all(
      //   patients.map(async (patient) => {
      //     const { nextVisit, lastVisit } = await this.appointmentsService.getVisits(clinicId, patient.remote_id);
      //     const  insuranceArray = await this.insuranceService.getInsurance(clinicId, patient.remote_id);
          
      //     return {
      //       ...patient,
      //       insurance: insuranceArray?.length > 0 ? insuranceArray[0]?.subscriber || null : null,
      //       nextVisit,
      //       lastVisit,
      //     };
      //     }),
      //   );  

      // return patientsWithVisits;
    } catch (error) {
      throw new Error('Error fetching patients: ' + error.message);
    }
  }


  async getPaginatedPatients(clinicId, page, pageSize) {
    try {
      // Obtener datos de la API externa
      const { url, headers } = await this.getRequestConfig(clinicId)

      const response = await lastValueFrom(this.httpService.get(url, { headers }));
      const contacts = response.data.contacts;  

      // Filtrar los pacientes
      const patients = contacts
        .filter(contact => contact.type === 'PATIENT') 
      
      // Calcular el índice inicial y final para la página solicitada
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
    
      // Obtener los pacientes paginados
      const paginatedPatients = patients.slice(startIndex, endIndex); 
      
      // Calcular la información de paginación
      const totalItems = patients.length;
      const totalPages = Math.ceil(totalItems / pageSize);
        

      // // Obtener detalles adicionales para cada paciente
      // const patientsWithDetails = await Promise.all(
      //   paginatedPatients.map(async (patient) => {
      //     const { nextVisit, lastVisit } = await this.appointmentsService.getVisits(clinicId, patient.remote_id);
      //     const  insuranceArray = await this.insuranceService.getInsurance(clinicId, patient.remote_id);
          
      //     return {
      //       ...patient,
      //       fullname: `${patient.given_name} ${patient.family_name}`,
      //       age: this.calculateAge(patient.birth_date),
      //       insurance: insuranceArray?.length > 0 ? insuranceArray[0]?.subscriber || null : null,
      //       nextVisit,
      //       lastVisit,
      //       activeTreatment: false,
      //     };
      //     }),
      //   );  

      // return {
      //   currentPage: page,
      //   pageSize,
      //   totalItems,
      //   totalPages,
      //   data: patientsWithDetails,
      // };  

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
