import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  sourcePosition: {
  },
  targetPosition: {
  },
  sourceAddress: {
  },
  targetAddress: {
  },
  encoded_polyline: '',
  summary: '',
  error: ''
}

export const HereDataSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    GET_START_GEOLOCATION: (state, action) => {
      state.sourcePosition = action.payload.items[0].position
      state.sourceAddress = action.payload.items[0].address
    },
    GET_END_GEOLOCATION: (state, action) => {
      state.targetPosition = action.payload.items[0].position
      state.targetAddress = action.payload.items[0].address
    },
    GET_POLYLINE_AND_SUMMARY: (state, action) => {
      if (action.payload.notices !== undefined) {
        return initialState
      }
        state.encoded_polyline = action.payload.routes[0].sections[0].polyline
        state.summary = action.payload.routes[0].sections[0].summary
    },
    CLEAR_STATE: () => initialState,
    ERROR: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { GET_START_GEOLOCATION, GET_END_GEOLOCATION, GET_POLYLINE_AND_SUMMARY, CLEAR_STATE, ERROR } = HereDataSlice.actions

export const GetHereData = (adresses) => async (dispatch) => {
  try {
    dispatch(CLEAR_STATE())
    await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${adresses.start.number}+${adresses.start.street}%2C+${adresses.start.zipcode}+${adresses.start.city}%2C+${adresses.start.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    .then(res => dispatch(GET_START_GEOLOCATION(res.data)))
    
    await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${adresses.end.number}+${adresses.end.street}%2C+${adresses.end.zipcode}+${adresses.end.city}%2C+${adresses.end.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    .then(res => dispatch(GET_END_GEOLOCATION(res.data)))
    }
    catch (err) {
      dispatch(err)
      throw new Error(err);
    }
};

export const GetSummaryAndPolyline = (src, trg) => async (dispatch) => {
  try{
    await axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${src.lat},${src.lng}&destination=${trg.lat},${trg.lng}&return=polyline,summary&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    .then(res => {
      dispatch(GET_POLYLINE_AND_SUMMARY(res.data))
    })
  }
  catch(err) {
    dispatch(err)
    throw new Error(err);
  }
}

export default HereDataSlice.reducer