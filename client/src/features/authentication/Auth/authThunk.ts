import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosinstance";
import axios from "axios";

export const loginUser = createAsyncThunk("user/auth/login",async (userLogin,thunkAPI)=>{
    try{
        const res = await axios.post("http://localhost:8000/user/api/auth/login",userLogin);
        return res.data;
    }catch(error){
       return thunkAPI.rejectWithValue(
        error || "Failed to login"
       )
    }
})

export const signupUser = createAsyncThunk("user/auth/signup",async (userSignup,thunkApPI)=>{
    try{
        console.log(userSignup);
        const res = await axios.post("http://localhost:8000/user/api/auth/signup",userSignup);
        return res.data;
    }catch(error){
        return thunkApPI.rejectWithValue(error || "Failed to signup");
    }
})

