import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    sourcePosition: {
        "lat": null,
        "lng": null
    },
    targetPosition: {
        "lat": null,
        "lng": null
    },
    sourceAddress: {

    },
    targetAddress: {
    
    },
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
    ERROR: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { GET_START_GEOLOCATION, GET_END_GEOLOCATION, ERROR } = geolocationSlice.actions

export const GetGeolocationAction = (adresses) => async (dispatch) => {
  try {
    const start = {
      street: adresses.start_street_name,
      number: adresses.start_street_number,
      city: adresses.start_city,
      zipcode: adresses.start_zipcode,
      country: adresses.start_country
    }
    const end = {
      street: adresses.end_street_name,
      number: adresses.end_street_number,
      city: adresses.end_city,
      zipcode: adresses.end_zipcode,
      country: adresses.end_country
    }
    const start_response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${start.number}+${start.street}%2C+${start.zipcode}+${start.city}%2C+${start.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    dispatch(GET_START_GEOLOCATION(start_response.data))

    const end_response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${end.number}+${end.street}%2C+${end.zipcode}+${end.city}%2C+${end.country}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
    dispatch(GET_END_GEOLOCATION(end_response.data))

    }catch (err) {
      dispatch(err)
      throw new Error(err);
    }
};

export default geolocationSlice.reducer