import {
  AppointmentType,
  AppointmentTypesState,
} from '../types/appointment.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppointmentTypesState = {
  types: [],
}

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setTypes(state, action: PayloadAction<AppointmentType[]>) {
      state.types = action.payload
    },
    clearTypes(state) {
      state.types = []
    },
  },
})

export const { setTypes, clearTypes } = typesSlice.actions
export default typesSlice.reducer
