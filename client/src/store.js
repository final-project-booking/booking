
import { configureStore } from '@reduxjs/toolkit';
  import editeSlice from './SliceAction/editProfile';
  import signUpSlice from './SliceAction/authentication/signUpAction';
  import signInSlice from './SliceAction/authentication/signInAction';
  import getOneSlice from "./SliceAction/getOne"
  import reservation from './SliceAction/reservation'
  import reviewSlice from "./SliceAction/review"
  import getRoomByCategory from './SliceAction/getRoomByCategory';
  import OwnerProfile from './SliceAction/OwnerProfile';
  import Rooms from './SliceAction/Rooms'
  import HotelsSlice from './SliceAction/HotelsSlice';
 
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    userSignIn:signInSlice,
    edite:editeSlice,
    getOne:getOneSlice,
    getOne:getOneSlice,
    reservation:reservation,
    getRoomByCategory:getRoomByCategory,
    OwnerProfile:OwnerProfile,
    Rooms:Rooms,
    review:reviewSlice,
    getRoomByCategory:getRoomByCategory,
    allHotels:HotelsSlice, 
}
});


export default store;