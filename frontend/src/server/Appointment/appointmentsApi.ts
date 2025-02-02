export const fetchUserAppointmentsTest = async (
    userId: string,
    token: string,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/user/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
  
      if (!response.ok) {
        throw new Error('Failed to fetch appointments.')
      }
  
      const appointments = await response.json()
      console.log('Appointments fetched successfully:', appointments)
      return appointments
    } catch (error) {
      console.error('Error fetching appointments:', error)
      throw error
    }
  }