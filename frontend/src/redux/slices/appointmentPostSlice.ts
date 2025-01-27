import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentPostState } from '../types/appointment.interface'

const initialState: AppointmentPostState = {
    contact_id: '',
    wall_start_time:'',
    wall_end_time:'',
    providers: [],
    appointment_type_id:'',
    operatory:'',
    short_description:'',
    notes:'',
}

const appointmentPostSlice = createSlice({
  name: 'appointmentPost',
  initialState,
  reducers: {
    setAppointmentPost(state, action: PayloadAction<AppointmentPostState>) {
      return { ...state, ...action.payload }
    },
    updateAppointmentPost(state, action: PayloadAction<Partial<AppointmentPostState>>) {
      return { ...state, ...action.payload }
    },
    clearAppointmentPost() {
      return initialState
    },
  },
})

export const { setAppointmentPost, updateAppointmentPost, clearAppointmentPost } = appointmentPostSlice.actions
export default appointmentPostSlice.reducer