import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClinicConfigService } from 'src/config/clinicsConfig.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clinicConfigService: ClinicConfigService,
  ) {}

  private async getRequestConfig(clinicId: string) {
      try {
        const { apiUrl, bearerToken, connectorId, consumerId } =
          await this.clinicConfigService.getConfig(clinicId)
  
        return {
          url: `${apiUrl}/appointments`,
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

    async getVisits(
      clinicId: string,
      contactId: string,
    ): Promise<{ nextVisit: string | null; lastVisit: string | null }> {
      try {
        // Obtener datos desde la API externa
        const { url, headers } = await this.getRequestConfig(clinicId);
    
        const response = await lastValueFrom(this.httpService.get(url, { headers }));
        const appointments = response.data.appointments;
    
        const now = new Date();
    
        // Filtrar por contact_id
        const filteredAppointments = appointments.filter(
          (appointment) => appointment.contact_id === contactId,
        );
        console.log('filteredAppointments', filteredAppointments);
        
    
        // Filtrar y ordenar para nextVisit
        const futureAppointments = filteredAppointments
          .filter((appointment) => {
            const startTime = new Date(appointment.start_time);
            return (
              startTime > now &&
              !appointment.completed &&
              !appointment.cancelled &&
              !appointment.broken
            );
          })
          .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
    
        const nextVisit = futureAppointments.length > 0
          ? new Date(futureAppointments[0].start_time).toISOString().split('T')[0]
          : null;
    
        // Filtrar y ordenar para lastVisit
        const pastAppointments = filteredAppointments
          .filter((appointment) => {
            const startTime = new Date(appointment.start_time);
            return startTime < now && appointment.confirmed;
          })
          .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
    
        const lastVisit = pastAppointments.length > 0
          ? new Date(pastAppointments[0].start_time).toISOString().split('T')[0]
          : null;
    
        return { nextVisit, lastVisit };
      } catch (error) {
        throw new Error('Error fetching appointments: ' + error.message);
      }
    }
    



   
}
