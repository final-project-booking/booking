import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




export const signUpAsync=createAsyncThunk(
    "signUp/user",
    async(obj,{rejectWithValue})=>{
        try {
            const response=await axios.post(`http://${process.env.AP_adress}:3000/api/user/register`,obj)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

