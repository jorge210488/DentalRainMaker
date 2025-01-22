export const fetchPatientsList = async (clinicId: string, bearerToken: string) => {
    try {
        
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients?clinicId=${encodeURIComponent(clinicId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      )

      
      if (!response.ok) {
        throw new Error('Failed to fetch patients.')
      }
  
      const patients = await response.json()
      console.log('Patients fetched successfully:', patients)
      return patients
    } catch (error) {
      console.error('Error fetching patients:', error)
      throw error
    }
  }