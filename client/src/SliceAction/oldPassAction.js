import { checkOldAsync } from '../reduce/oldPassReduce';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    loading: false,
    error: ""
};

const checkOldPassword = createSlice({
    name: "oldPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkOldAsync.pending, (state) => {
                state.loading = true;
                state.error = ""; // Reset error on pending
            })
            .addCase(checkOldAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Assuming payload is the response
                state.error = ""; // Reset error on success
            })
            .addCase(checkOldAsync.rejected, (state) => {
                state.loading = false;
                state.error = "Incorrect password. Please try again."; // Set specific error message on rejection
            });
    }
});

export default checkOldPassword.reducer;
