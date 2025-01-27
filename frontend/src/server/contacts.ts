export const fetchContacts = async (clinicId: string, bearerToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contacts?clinicId=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch contacts.')
    }

    const contacts = await response.json()
    console.log('Contacts fetched successfully:', contacts)
    return contacts
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
}

export const fetchContactById = async (
  clinicId: string,
  remoteId: string,
  bearerToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contacts/${encodeURIComponent(remoteId)}?clinicId=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch contact by ID.')
    }

    const contact = await response.json()

    // Transformar los datos al formato del slice
    const transformedContact = {
      name: contact.name,
      given_name: contact.given_name || '',
      family_name: contact.family_name || '',
      preferred_name: contact.preferred_name || '',
      gender: contact.gender === 'GENDER_OTHER' ? 'OTHER' : contact.gender,
      birth_date: contact.birth_date || '',
      notes: contact.notes || '',
      addresses: contact.addresses.map((address: any) => ({
        street_address: address.street_address || '',
        city: address.city || '',
        state: address.state || '',
        postal_code: address.postal_code || '',
        country_code: address.country_code || '',
        type: address.type || '',
      })),
      phone_numbers: contact.phone_numbers.map((phone: any) => ({
        number: phone.number || '',
        type: phone.type || '',
      })),
      primary_phone_number: contact.primary_phone_number || '',
      email_addresses: contact.email_addresses.map((email: any) => ({
        address: email.address || '',
        type: email.type || '',
      })),
      primary_email_address: contact.primary_email_address || '',
      state: contact.state || 'ACTIVE',
    }

    console.log('Contact transformed successfully:', transformedContact)
    return transformedContact
  } catch (error) {
    console.error('Error fetching contact by ID:', error)
    throw error
  }
}

interface Address {
  street_address: string
  city: string
  state: string
  postal_code: string
  country_code: string
  type: string
}

interface PhoneNumber {
  number: string
  type: string
}

interface EmailAddress {
  address: string
  type: string
}

export const updateContact = async (
  clinicId: string,
  remoteId: string,
  bearerToken: string,
  updateContactDto: Partial<{
    given_name: string
    family_name: string
    preferred_name?: string
    gender?: 'MALE' | 'FEMALE' | 'OTHER'
    birth_date?: string
    notes?: string
    addresses?: Address[]
    phone_numbers?: PhoneNumber[]
    email_addresses?: EmailAddress[]
  }>,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contacts/${encodeURIComponent(remoteId)}?clinicId=${encodeURIComponent(clinicId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(updateContactDto),
      },
    )
    
    if (!response.ok) {
      throw new Error('Failed to update contact.')
    }

    const updatedContact = await response.json()
    console.log('Contact updated successfully:', updatedContact)
    return updatedContact
  } catch (error) {
    console.error('Error updating contact:', error)
    throw error
  }
}
