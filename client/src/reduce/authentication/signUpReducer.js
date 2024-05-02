import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




export const signUpAsync=createAsyncThunk(
    "signUp/user",
    async(obj,{rejectWithValue})=>{
        try {
            const response=await axios.post(`http://192.168.11.118:3000/api/user/register`,obj)
            console.log("signed");
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

