import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {AP_ADRESS} from "../apAdress"

export const fetchRoomByCategory = createAsyncThunk(
  'rooms/fetchByCategory',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`http://${AP_ADRESS}:3000/api/owner`, { params: query });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);