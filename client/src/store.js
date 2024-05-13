
import { configureStore } from '@reduxjs/toolkit';
  import editeSlice from './SliceAction/editProfile';
  import signUpSlice from './SliceAction/authentication/signUpAction';
  import signInSlice from './SliceAction/authentication/signInAction';
  import getOneSlice from "./SliceAction/getOne"
  import reservation from './SliceAction/reservation'
  // import allHotels from './SliceAction/AllHotels'
  import reviewSlice from "./SliceAction/review"
  import getRoomByCategory from './SliceAction/getRoomByCategory';
  import HotelsSlice from './SliceAction/HotelsSlice';
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    userSignIn:signInSlice,
    edite:editeSlice,
    getOne:getOneSlice,
    getOne:getOneSlice,
    reservation:reservation,
    review:reviewSlice,
    getRoomByCategory:getRoomByCategory,
    allHotels:HotelsSlice, 
}
});


export default store;