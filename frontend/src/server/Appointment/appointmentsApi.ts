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

export const sendSurveyEmail = async (
  remoteId: string,
  appointmentId: string,
  clinicId: string,
  clinicName: string,
  token: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/send-survey/${remoteId}/${appointmentId}/${clinicId}/${encodeURIComponent(clinicName)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send survey email.')
    }

    const result = await response.json()
    console.log('Survey email sent successfully:', result)
    return result
  } catch (error) {
    console.error('Error sending survey email:', error)
    throw error
  }
}
