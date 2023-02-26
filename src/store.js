import { configureStore } from '@reduxjs/toolkit'
import HereDataSlice from './features/HereDataSlice'
import logger from './logger'
import historyReducer from './features/HistorySlice'

export default configureStore({
  reducer: {
    heredata: HereDataSlice,
    history: historyReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})