import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}


const authSlice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{
        
        settoken( state , value){
             state.token = value.payload
        }

    }
})

export const {settoken} = authSlice.actions;
export default authSlice.reducer; 