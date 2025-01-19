import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface UserState {
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
  img_url?: string
  clinics: string[]
}

const initialState: UserState = {
  name: '',
  given_name: '',
  family_name: '',
  preferred_name: '',
  gender: 'OTHER',
  birth_date: '',
  addresses: [],
  phone_numbers: [],
  primary_phone_number: '',
  email_addresses: [],
  primary_email_address: '',
  state: 'ACTIVE',
  img_url: '',
  clinics: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload }
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload }
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, updateUser, clearUser } = userSlice.actions
export default userSlice.reducer
