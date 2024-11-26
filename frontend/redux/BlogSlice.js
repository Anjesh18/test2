import { createSlice } from "@reduxjs/toolkit";

const blogSlice=createSlice({
    name:"blog",
    initialState:{
        blogs:[],
        searchedQuery:''
    },
    reducers:{
        setBlogs:(state,action)=>{
            state.blogs=action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.query=action.payload
        }
    }
})

export const {setBlogs, setSearchedQuery} =blogSlice.actions
export default blogSlice.reducer