import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Clinic {
  _id: string
  clinic_name: string
  clinic_website?: string
}

interface ClinicsState {
  clinics: Clinic[]
}

const initialState: ClinicsState = {
  clinics: [],
}

const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  reducers: {
    setClinics(state, action: PayloadAction<Clinic[]>) {
      state.clinics = action.payload
    },
    clearClinics(state) {
      state.clinics = []
    },
    addClinic(state, action: PayloadAction<Clinic>) {
      state.clinics.push(action.payload)
    },
    removeClinic(state, action: PayloadAction<string>) {
      state.clinics = state.clinics.filter(
        (clinic) => clinic._id !== action.payload,
      )
    },
    updateClinic(state, action: PayloadAction<Clinic>) {
      const index = state.clinics.findIndex(
        (clinic) => clinic._id === action.payload._id,
      )
      if (index !== -1) {
        state.clinics[index] = action.payload
      }
    },
  },
})

export const {
  setClinics,
  clearClinics,
  addClinic,
  removeClinic,
  updateClinic,
} = clinicsSlice.actions

export default clinicsSlice.reducer
