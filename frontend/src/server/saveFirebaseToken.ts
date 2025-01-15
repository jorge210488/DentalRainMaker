export const saveFirebaseTokenToServer = async (
  userId: string,
  token: string,
  bearerToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/save`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ userId, token }),
      },
    )
    if (!response.ok) {
      throw new Error('Failed to save Firebase token to server.')
    }
    console.log('Firebase token saved successfully.')
  } catch (error) {
    console.error('Error saving Firebase token to server:', error)
  }
}