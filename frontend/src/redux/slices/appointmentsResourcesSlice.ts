import {
  AppointmentResourcesState,
  AppointmentResource,
} from '../types/appointment.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppointmentResourcesState = {
  resources: [],
}

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResources(state, action: PayloadAction<AppointmentResource[]>) {
      state.resources = action.payload
    },
    clearResources(state) {
      state.resources = []
    },
  },
})

export const { setResources, clearResources } = resourcesSlice.actions
export default resourcesSlice.reducer
