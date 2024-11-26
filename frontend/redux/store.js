import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './authSlice'
import BlogSlice from './BlogSlice'
const store=configureStore({
    reducer:{
        auth:AuthSlice,
        blog:BlogSlice
    }
})

export default store