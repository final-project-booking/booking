import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"

export const reservation = createAsyncThunk(
    'reservation',
    async (body) => {
      try {
        const {data} = await axios.post(`http://${AP_ADRESS}:3000/api/reservation`,body)
        console.log(data);
        return data
      } catch (error) {
          return error.response.data.message
         }}
  )