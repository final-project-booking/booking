import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const negotiation = createAsyncThunk(
    "negotiation/price",
    async ({roomId,newPrice,content,userId}) => {
      // console.log("userdata",userData)
      try {
        const response = await axios.post(`http://${AP_ADRESS}:3000/api/negotiation/${roomId}/${newPrice}/${content}/${userId}`);
        console.log("price",response.data);
        return response.data;
      } catch (error) {
        throw error
      }
    }
  );

