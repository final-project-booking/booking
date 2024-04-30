// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define the initial state of the owner's profile
// const initialState = {
//   profile: {},
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null
// };

// // Asynchronous thunk action
// export const submitOwnerProfile = createAsyncThunk(
//   'ownerProfile/submitOwnerProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/owner/create', profileData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const ownerProfileSlice = createSlice({
//   name: 'ownerProfile',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitOwnerProfile.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(submitOwnerProfile.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.profile = action.payload;
//       })
//       .addCase(submitOwnerProfile.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   }
// });

// export default ownerProfileSlice.reducer;
