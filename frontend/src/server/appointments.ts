import {
  AppointmentResource,
  AppointmentType,
} from '@/redux/types/appointment.interface'

export const fetchAppointments = async (
  clinicId: string,
  bearerToken: string,
  options: {
    pageSize?: number
    pageToken?: string
    orderBy?: string
    filter?: string
  } = {},
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/appointments?clinicId=${encodeURIComponent(clinicId)}`

    const queryParams = new URLSearchParams()
    if (options.pageSize) {
      queryParams.append('page_size', options.pageSize.toString())
    }
    if (options.pageToken) {
      queryParams.append('page_token', options.pageToken)
    }
    if (options.orderBy) {
      queryParams.append('order_by', options.orderBy)
    }
    if (options.filter) {
      queryParams.append('filter', options.filter)
    }

    if (queryParams.toString()) {
      url += `&${queryParams.toString()}`
    }

    console.log('URL de la peticion', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to fetch appointments: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const appointments = await response.json()
    console.log('Appointments fetched successfully:', appointments)
    return appointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}

export const appointmentTypes = async (
  clinicId: string,
  bearerToken: string,
): Promise<AppointmentType[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/appointmenttypes?clinic_id=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Appointments Types.')
    }

    const data = await response.json()

    const transformedTypes: AppointmentType[] = data.appointment_types.map(
      (type: any) => ({
        name: type.name,
        remote_id: type.remote_id,
        display_name: type.display_name,
        procedure_codes: type.procedure_codes || [],
        appointment_length: type.appointment_length || 0,
        additional_data: {
          color: type.additional_data?.color || '',
        },
      }),
    )

    console.log('Appointments types fetched and transformed:', transformedTypes)
    return transformedTypes
  } catch (error) {
    console.error('Error fetching Appointments types:', error)
    throw error
  }
}

export const appointmentResources = async (
  clinicId: string,
  bearerToken: string,
): Promise<AppointmentResource[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/resources?clinic_id=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Appointments Resources.')
    }

    const data = await response.json()

    const transformedResources: AppointmentResource[] = data.resources.map(
      (resource: any) => ({
        name: resource.name,
        remote_id: resource.remote_id,
        type: resource.type,
        display_name: resource.display_name,
        additional_data: resource.additional_data,
        update_time: resource.update_time,
      }),
    )

    console.log(
      'Appointments resources fetched and transformed:',
      transformedResources,
    )
    return transformedResources
  } catch (error) {
    console.error('Error fetching Appointments resources:', error)
    throw error
  }
}

export const getAppointmentsByContactId = async (
  clinicId: string,
  contactId: string,
  bearerToken: string,
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/contact/${contactId}?clinic_id=${encodeURIComponent(clinicId)}`

    console.log('URL de la peticion', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to fetch contact appointments: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const appointments = await response.json()
      console.log('Contact appointments fetched successfully:', appointments)
      return appointments
    } catch (error) {
      console.error('Error fetching contact appointments:', error)
      throw error
    }
  }


export const getlistDoctors = async(
  clinicId: string,
  bearerToken: string,
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/resources?clinic_id=${encodeURIComponent(clinicId)}`

    console.log('URL de la peticion', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to fetch resources: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const {resources} = await response.json()
    console.log("los resources de la clinica",resources);
    
    const doctors = resources
    .filter((resource:any) => 
      resource.type === "PROVIDER"
    )
    .map((doctor:any) => ({
      ...doctor,
      name:doctor.display_name,
      specialty:"Dentistry"
    }));

    console.log('Doctors list fetched successfully:', doctors)
    return doctors
  } catch (error) {
    console.error('Error fetching doctors list:', error)
    throw error
  }
    
}




interface Provider {
  name: string;
  remote_id: string;
  type: string;
}


export const postAppointment = async (
  clinicId: string,
  bearerToken: string,
  appointment:{
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
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/?clinic_id=${encodeURIComponent(clinicId)}`

    console.log('URL de la peticion', url)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(appointment),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to post appointment: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const appointmentCreated = await response.json()
    console.log('Contact appointment posted successfully:', appointmentCreated)
    return appointmentCreated
  } catch (error) {
    console.error('Error posting contact appointment:', error)
    throw error
  }
}