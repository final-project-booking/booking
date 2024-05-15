
import { configureStore } from '@reduxjs/toolkit';
  import editeSlice from './SliceAction/editProfile';
  import signUpSlice from './SliceAction/authentication/signUpAction';
  import signInSlice from './SliceAction/authentication/signInAction';
  import getOneSlice from "./SliceAction/getOne"
  import reservation from './SliceAction/reservation'
  import allHotels from './SliceAction/AllHotels'
  import reviewSlice from "./SliceAction/review"
  import getRoomByCategory from './SliceAction/getRoomByCategory';
  import negotiation from './SliceAction/negotiation';
  import compairePrice from './SliceAction/comparPrice';
  import OwnerProfile from './SliceAction/OwnerProfile';
  import Rooms from './SliceAction/Rooms'
  import HotelsSlice from './SliceAction/HotelsSlice';
import AllHotels from './SliceAction/AllHotels';
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    userSignIn:signInSlice,
    edite:editeSlice,
    getOne:getOneSlice,
    getOne:getOneSlice,
    reservation:reservation,
    allHotels:allHotels,
    getRoomByCategory:getRoomByCategory,
    comparPrice:compairePrice,
    review:reviewSlice,
    getRoomByCategory:getRoomByCategory,
    // AllHotel:HotelsSlice, 
    negotiation:negotiation,
    getRoomByCategory:getRoomByCategory,
    OwnerProfile:OwnerProfile,
    Rooms:Rooms,
    review:reviewSlice,
    getRoomByCategory:getRoomByCategory,
    AllHotels:AllHotels,
    allHotels:HotelsSlice, 
}
});


export default store;