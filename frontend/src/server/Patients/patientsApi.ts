export const fetchPatientsList = async (clinicId: string, page: number, pagesize: number, bearerToken: string) => {
    try {
        console.log('Fetching patients List...');
        
      const response = await fetch(
        `http://localhost:3200/patients/paginated?clinicId=${encodeURIComponent(clinicId)}&page=${page}&pagesize=${pagesize}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      )
      console.log('Response de fetchpatientslist:', response);
      
      if (!response.ok) {
        throw new Error('Failed to fetch patients.')
      }
  
      const {data} = await response.json()
      console.log('Patients fetched successfully:', data)
      return data
    } catch (error) {
      console.error('Error fetching patients:', error)
      throw error
    }
  }