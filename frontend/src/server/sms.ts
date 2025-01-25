export const sendSmsToServer = async (
  sendSmsDto: {
    remote_id: string
    clinic_id: string
    clinic_name: string
    to: string
    body: string
  },
  bearerToken: string,
): Promise<{ status: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sms/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(sendSmsDto),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send SMS.')
    }

    console.log('SMS sent successfully:', await response.json())
    return { status: 'SMS sent successfully' }
  } catch (error) {
    console.error('Error sending SMS:', error)
    throw error
  }
}
