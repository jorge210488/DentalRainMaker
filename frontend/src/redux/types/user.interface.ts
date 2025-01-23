export interface Address {
  street_address: string
  city: string
  state: string
  postal_code: string
  country_code: string
  type: string
}

export interface PhoneNumber {
  number: string
  type: string
}

export interface EmailAddress {
  address: string
  type: string
}

export interface UserState {
  name: string
  given_name: string
  family_name: string
  preferred_name?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  birth_date?: string
  notes?: string
  addresses?: Address[]
  phone_numbers?: PhoneNumber[]
  primary_phone_number?: string
  email_addresses?: EmailAddress[]
  primary_email_address: string
  state: 'ACTIVE' | 'INACTIVE' | 'DECEASED'
}
