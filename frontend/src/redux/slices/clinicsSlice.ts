import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Clinic {
  _id: string
  clinic_name: string
  clinic_website?: string
}

interface ClinicsState {
  clinics: Clinic[]
  selectedClinicId: string | null // Nueva propiedad para almacenar el ID de la clínica seleccionada
}

const initialState: ClinicsState = {
  clinics: [],
  selectedClinicId: null, // Inicializar con null
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
    setSelectedClinic(state, action: PayloadAction<string>) {
      state.selectedClinicId = action.payload // Establecer el ID de la clínica seleccionada
    },
    clearSelectedClinic(state) {
      state.selectedClinicId = null // Limpiar la clínica seleccionada
    },
  },
})

export const {
  setClinics,
  clearClinics,
  addClinic,
  removeClinic,
  updateClinic,
  setSelectedClinic,
  clearSelectedClinic,
} = clinicsSlice.actions

export default clinicsSlice.reducer
