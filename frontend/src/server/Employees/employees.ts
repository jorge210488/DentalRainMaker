export const fetchEmployees = async (clinic_id: string, bearerToken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/employeers?clinic_id=${encodeURIComponent(clinic_id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      )
  
      if (!response.ok) {
        throw new Error('Failed to fetch employees.')
      }
  
      const employees = await response.json()
      console.log('Employees fetched successfully:', employees)
      return employees
    } catch (error) {
      console.error('Error fetching employees:', error)
      throw error
    }
  }



  export const updateTypeEmployee = async (
    clinic_id: string, 
    bearerToken: string, 
    credential_id: string, 
    type: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${encodeURIComponent(credential_id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            type,
            clinic_id
          }),
        },
      )
  
      if (!response.ok) {
        throw new Error('Failed to udpate type employee.')
      }
  
      const employees = await response.json()
      console.log('Employee type updated successfully:', employees)
      return employees
    } catch (error) {
      console.error('Error updating employee type:', error)
      throw error
    }
  }  
