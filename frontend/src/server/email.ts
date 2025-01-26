export interface ICreateEmailDto {
  remote_id: string
  clinic_id: string
  to: string
  subject: string
  greetings?: string
  given_name: string
  clinic_name: string
  body: string
  link?: string
  closing?: string
  signature?: string
  sendAt?: string
}

export const sendEmailToServer = async (
  emailDto: ICreateEmailDto,
  bearerToken: string,
): Promise<{ status: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/nodemailer/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(emailDto),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send email.')
    }

    const result = await response.json()

    if (!result || !result.status) {
      throw new Error('Unexpected response format from server.')
    }

    console.log('Email sent successfully:', result)
    return result // { status: "Your email was sent successfully." }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
