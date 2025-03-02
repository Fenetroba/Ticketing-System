import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from './UserAuth.js'
export const Store=configureStore({
     reducer:{
Auth:userAuthSlice
     }
})