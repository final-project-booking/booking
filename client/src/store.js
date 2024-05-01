
import { configureStore } from '@reduxjs/toolkit';

  import signUpSlice from './reduce/authentication/signUpReducer';
  import user from './SliceAction/chat'
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    user:user
}
});


export default store;