
import { configureStore } from '@reduxjs/toolkit';

  import signUpSlice from './reduce/authentication/signUpReducer';
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,

}
});


export default store;