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
