import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const HereDataSlice = createSlice({
  name: 'geolocation',
  initialState: {
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
  },
  reducers: {
    GET_START_GEOLOCATION: (state, action) => {
      state.sourcePosition = action.payload.items[0].position
      state.sourceAddress = action.payload.items[0].address
    },
    GET_END_GEOLOCATION: (state, action) => {
      state.targetPosition = action.payload.items[0].position
      state.targetAddress = action.payload.items[0].address
    },
    GET_POLYLINE: (state, action) => {
      state.encoded_polyline = action.payload.routes[0].sections[0].polyline
    },
    GET_SUMMARY: (state, action) => {
      state.summary = action.payload.routes[0].sections[0].summary
    },
    ERROR: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { GET_START_GEOLOCATION, GET_END_GEOLOCATION, GET_POLYLINE, GET_SUMMARY, ERROR } = HereDataSlice.actions

export const GetHereData = (adresses) => async (dispatch) => {
  try {
    const start_response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${adresses.start.number}+${adresses.start.street}%2C+${adresses.start.zipcode}+${adresses.start.city}%2C+${adresses.start.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    dispatch(GET_START_GEOLOCATION(start_response.data))

    const end_response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${adresses.end.number}+${adresses.end.street}%2C+${adresses.end.zipcode}+${adresses.end.city}%2C+${adresses.end.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    dispatch(GET_END_GEOLOCATION(end_response.data))

    }catch (err) {
      dispatch(err)
      throw new Error(err);
    }
};

export const GetSummaryAndPolyline = (src, trg) => async (dispatch) => {
  try{
    const polyline_summary = await axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${src.lat},${src.lng}&destination=${trg.lat},${trg.lng}&return=polyline,summary&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    dispatch(GET_POLYLINE(polyline_summary.data))
    dispatch(GET_SUMMARY(polyline_summary.data))
  }
  catch(err) {
    dispatch(err)
    throw new Error(err);
  }
}

export default HereDataSlice.reducer