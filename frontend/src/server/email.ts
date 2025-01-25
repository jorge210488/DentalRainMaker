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

const sendEmailToServer = async (
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

    console.log('Email sent successfully:', await response.json())
    return { status: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
