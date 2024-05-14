import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AP_ADRESS } from '../../apAdress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInAsync = createAsyncThunk(
  'signIn/user',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://${AP_ADRESS}:3000/api/user/login`, obj);
      console.log(response.data);
      try {
        await AsyncStorage.setItem('token', response.data.token);
        console.log("Token stored successfully");
      } catch (err) {
        console.log("Error storing token:", err);
      }

      console.log("actionAuth", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
