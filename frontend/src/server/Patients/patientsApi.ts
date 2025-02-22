import { fetchWithTimeout } from '@/utils/fetchwithTimeout'

export const fetchPatientsList = async (
  clinicId: string,
  bearerToken: string,
) => {
  if (!clinicId || !bearerToken) {
    throw new Error('Clinic ID or Bearer Token is missing.')
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('API URL is not defined.')
  }

  try {
    const response = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_API_URL}/patients?clinicId=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
      100000, //tiempo timeout espera completa fetch
    )
    console.log('respuesta del fetch', response)

    if (!response.ok) {
      const errorDetail = await response.json()
      console.error('API Error:', errorDetail)
      throw new Error(errorDetail.message || 'Failed to fetch patients.')
    }

    const patients = await response.json()
    console.log('Patients fetched successfully:', patients)
    return patients
  } catch (error) {
    console.error('Error fetching patients:', error)
    throw error
  }
}
