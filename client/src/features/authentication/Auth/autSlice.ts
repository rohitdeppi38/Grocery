import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './authThunk';

interface loginType{
    user:string |null;
    token:string | null;
    loading:boolean ;
    error: unknown | null;
}

const initialState :loginType = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state,action){
            state.user=null;
            state.error=null;;
            state.token=null;
            state.loading=false;
            localStorage.removeItem("token");
        }
    },
    extraReducers(builder){
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token= action.payload.token;

            localStorage.setItem("token",action.payload.token);
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(signupUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.token=action.payload.token;

            localStorage.setItem("token",action.payload.token);
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    },
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;
