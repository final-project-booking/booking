
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';
import ownerProfileReducer from './SliceAction/OwnerProfile'
const store = configureStore({
  reducer: {
    // counter: counterReducer,
    ownerProfile: ownerProfileReducer,
    
  }


// import signUpSlice from './reduce/authentication/signUpReducer';
// const store = configureStore({
//   reducer: {
//     userSignUp:signUpSlice,


});


// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']



export default store;