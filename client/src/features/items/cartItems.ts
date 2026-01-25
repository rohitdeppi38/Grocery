import {createSlice,type PayloadAction} from "@reduxjs/toolkit";

import type{List} from "../../types/itemList"
import { fetchItems } from "./itemthunks";

interface ItemState {
    cartItems:List[];
    loading: boolean;
    error: string | null;
}

const initialState:ItemState={
    cartItems:[],
    loading: false,
    error: null
}

const itemSlice = createSlice({
    name:"items",
    initialState,
   reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(fetchItems.pending,state=>{
            state.loading=true;
        })
        .addCase(fetchItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
        })
        .addCase(fetchItems.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message ?? "Failed";
        })

    }

});

export default itemSlice.reducer