import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'geolocation',
  initialState: {
    history: [],
    error: ''
  },
  reducers: {
    SAVE_TO_HISTORY: (state, action) => {
        state.history.push(action.payload)
    },
    ERROR: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { SAVE_TO_HISTORY, ERROR } = historySlice.actions


export default historySlice.reducer