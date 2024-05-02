import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




export const signInAsync=createAsyncThunk(
    "signIn/user",
    async(obj,{rejectWithValue})=>{
        try {
            const response=await axios.post(`http://192.168.11.118:3000/api/user/login`,obj)
            let token =response.data.token
            localStorage.setItem("token",token)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

