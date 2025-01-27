export const fetchClinics = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clinics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch clinics.')
    }

    const clinics = await response.json()
    console.log('Clinics fetched successfully:', clinics)
    return clinics
  } catch (error) {
    console.error('Error fetching clinics:', error)
    throw error
  }
}
