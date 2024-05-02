
import { configureStore } from '@reduxjs/toolkit';

  import signUpSlice from './SliceAction/authentication/signUpAction';
  import signInSlice from './SliceAction/authentication/signInAction';
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    userSignIn:signInSlice
}
});


export default store;