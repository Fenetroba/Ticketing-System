import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from './UserAuth.js'
import ticketsReducer from './tickets.js'
export const Store=configureStore({
     reducer:{
Auth:userAuthSlice,
tickets: ticketsReducer,
     }
})