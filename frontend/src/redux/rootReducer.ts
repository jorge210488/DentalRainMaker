import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import clinicsReducer from './slices/clinicsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  clinics: clinicsReducer,
})

export default rootReducer
