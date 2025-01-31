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