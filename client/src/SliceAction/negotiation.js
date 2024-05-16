import {negotiation} from '../reduce/negotiation'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    negotiation:[],
    loading:false,
    error:""
}


const negotiations = createSlice({
    name:"fetchReview",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(negotiation.pending,(state)=>{
            state.loading=true
        })
        .addCase(negotiation.fulfilled,(state,action)=>{
            state.loading=false
            state.negotiation=action.payload
        })
        .addCase(negotiation.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default negotiations.reducer