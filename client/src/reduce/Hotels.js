import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"

export const AllHotell = createAsyncThunk(
    'AllHotels',
    async () => {
      try {
        const {data} = await axios.get(`http://${AP_ADRESS}:3000/api/hotels`)
        return data
      } catch (error) {
          return error.response.data.message
         }}
  )