import {signInAsync} from '../../reduce/authentication/signInReducer'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    userAuth:{},
    loading:false,
    error:""
}


const signIn = createSlice({
    name:"userAuth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signInAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(signInAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(signInAsync.rejected,(state)=>{
            state.loading=false
            state.error="invalid email or password"
        })
    }
})

export default signIn.reducer