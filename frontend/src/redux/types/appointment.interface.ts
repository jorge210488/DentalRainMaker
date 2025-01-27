// ****** INTERFACE FOR APPOINTMENT RESOURCES *******

interface AdditionalData {
  city?: string
  phone?: string
  postal_code?: string
  state?: string
  street_address?: string
  national_provider_id?: string
  short_display_name?: string
  user_id?: string
  suffix?: string
  display_order?: string
  provider?: string
  hygienist?: string
}

export interface AppointmentResource {
  name: string
  remote_id: string
  type: 'PRACTICE' | 'PROVIDER' | 'STAFF' | 'OPERATORY'
  display_name: string
  additional_data: AdditionalData
  update_time: string | null
}

export interface AppointmentResourcesState {
  resources: AppointmentResource[]
}

// ****** INTERFACE FOR APPOINTMENT TYPES*******

interface AppointmentTypeAdditionalData {
  color?: string
}

export interface AppointmentType {
  name: string
  remote_id: string
  display_name: string
  procedure_codes: string[]
  appointment_length: number
  additional_data: AppointmentTypeAdditionalData
}

export interface AppointmentTypesState {
  types: AppointmentType[]
}


// ****** INTERFACE FOR POST APPOINTMENT *******

interface Provider {
  name: string;
  remote_id: string;
  type: string;
}



export interface AppointmentPostState {
    
    contact_id: string
    wall_start_time:string
    wall_end_time:string
    providers: Provider[]
    scheduler?:{
        name:string;
        remote_id:string;
        type:string;
    }
    appointment_type_id?:string
    operatory:string
    short_description?:string
    notes?:string
        
}

/* EJEMPLO COMO SE DEBE ENVIAR LA DATA POST APPOINTMENT 
{
  "contact_id": "812",
  "wall_start_time": "2025-03-19 10:00:00",
  "wall_end_time": "2025-03-19 11:00:00",
  "providers": [
    {
      "name": "resources/provider_1",
      "remote_id": "provider_1",
      "type": "PROVIDER"
    }
  ],
  "scheduler": {
    "name": "Jane Scheduler",
    "remote_id": "123",
    "type": "room"
  },
  
  "operatory": "resources/operatory_5"
  
} */

