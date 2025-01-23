import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../types/user.interface'

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
