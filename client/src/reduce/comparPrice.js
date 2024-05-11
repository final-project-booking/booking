import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const ComparPrice = createAsyncThunk(
    "compair/price",
    async (body) => {
      // console.log("userdata",userData)
      try {
        const response = await axios.put(`http://${AP_ADRESS}:3000/api/price/`, body);
        console.log("price",response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

