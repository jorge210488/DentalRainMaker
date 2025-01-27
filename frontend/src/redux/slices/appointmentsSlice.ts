import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppointmentsState {
    appointments: IAppointment[]
}

const initialState: AppointmentsState = {
    appointments: [],
}

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setAppointments(state, action: PayloadAction<IAppointment[]>) {
            state.appointments = action.payload
        },
        clearAppointments(state) {
            state.appointments = []
        },
        addAppointment(state, action: PayloadAction<IAppointment>) {
            state.appointments.push(action.payload)
        },
        removeAppointment(state, action: PayloadAction<string>) {
            state.appointments = state.appointments.filter(
                (appointment) => appointment.remote_id !== action.payload,
            )
        },
        updateAppointment(state, action: PayloadAction<IAppointment>) {
            const index = state.appointments.findIndex(
                (appointment) => appointment.remote_id === action.payload.remote_id,
            )
            if (index !== -1) {
                state.appointments[index] = action.payload
            }
        },
    },
})