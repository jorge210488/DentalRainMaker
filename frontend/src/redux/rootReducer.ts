import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import clinicsReducer from './slices/clinicsSlice'
import notificationsReducer from './slices/notificationsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  clinics: clinicsReducer,
  notifications: notificationsReducer,
})

export default rootReducer
