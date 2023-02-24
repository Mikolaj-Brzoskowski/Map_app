import { configureStore } from '@reduxjs/toolkit'
import geolocationReducer from './features/geolocationSlice'
import logger from './logger'

export default configureStore({
  reducer: {
    geolocation: geolocationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})