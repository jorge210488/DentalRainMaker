import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import clinicsReducer from './slices/clinicsSlice'
import notificationsReducer from './slices/notificationsSlice'
import appointmentsReducer from './slices/appointmentsSlice'
import appointmentsResourcesReducer from './slices/appointmentsResourcesSlice'
import appointmentTypesReducer from './slices/appointmentTypesSlice'
import appointmentPostReducer from './slices/appointmentPostSlice'

const rootReducer = combineReducers({
  user: userReducer,
  clinics: clinicsReducer,
  notifications: notificationsReducer,
  appointmentPost: appointmentPostReducer,
  appointments: appointmentsReducer,
  appointmentsResources: appointmentsResourcesReducer,
  appointmentTypes: appointmentTypesReducer,
})

export default rootReducer
