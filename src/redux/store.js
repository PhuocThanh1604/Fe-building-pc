/* eslint-disable prettier/prettier */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import alertsSlice from './alertsSlice'
import usersSlice from './usersSlice'

const rootReducer = combineReducers({
  alert: alertsSlice,
  users: usersSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
