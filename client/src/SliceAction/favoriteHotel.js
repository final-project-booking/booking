
import {favoriteHotel,getFavoriteHotel,removeFavoriteHotel} from '../reduce/favoriteHotel'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    favorite:[],
    getFavorite:[],
    deletFavorite:null,
    loading:false,
    error:""
}


const favoriteSlice = createSlice({
    name:"favorite/hotel",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(favoriteHotel.pending,(state)=>{
            state.loading=true
        })
        .addCase(favoriteHotel.fulfilled,(state,action)=>{
            state.loading=false
            state.favorite=action.payload
        })
        .addCase(favoriteHotel.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
        .addCase(getFavoriteHotel.pending,(state)=>{
            state.loading=true
        })
        .addCase(getFavoriteHotel.fulfilled,(state,action)=>{
            state.loading=false
            state.getFavorite=action.payload
        })
        .addCase(getFavoriteHotel.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
        .addCase(removeFavoriteHotel.pending,(state)=>{
            state.loading=true
        })
        .addCase(removeFavoriteHotel.fulfilled,(state,action)=>{
            state.loading=false
            state.deletFavorite=action.payload
        })
        .addCase(removeFavoriteHotel.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default favoriteSlice.reducer