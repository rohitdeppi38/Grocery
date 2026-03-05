

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosinstance";
import axios from "axios";

interface signupPayload {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  email: string;
  password: string;
}

interface loginPayload{
    email:string;
    password:string;
}

export const loginUser = createAsyncThunk<any,loginPayload>("user/auth/login",async (userLogin,thunkAPI)=>{
    try{
        const res = await axios.post("http://localhost:8000/user/api/auth/login",userLogin);
        return res.data;
    }catch(error:any){
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to login"
       )
    }
})

export const signupUser = createAsyncThunk<any, signupPayload>(
  "user/auth/signup",
  async (userSignup, thunkAPI) => {
    try {
      console.log(userSignup);

      const res = await axios.post(
        "http://localhost:8000/user/api/auth/signup",
        userSignup
      );

      return res.data;

    } catch (error: any) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to signup"
      );

    }
  }
);
