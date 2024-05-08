import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"




export const reviewAsync=createAsyncThunk(
    "post/review",
    async(userId,hotelId,obj)=>{
        try {
            const response=await axios.post(`http://${AP_ADRESS}:3000/api/review/addReview/s${userId}/${hotelId}`,obj)
            console.log("review posted successfuly");
            console.log("review object",response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

