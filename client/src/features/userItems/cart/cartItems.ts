import {createSlice,type PayloadAction} from "@reduxjs/toolkit";

import type{List} from "../../../types/itemList"
import { fetchCartItems } from "./cartItemsThunk";

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

const CartItemSlice = createSlice({
    name:"items",
    initialState,
   reducers:{
        addLocalCart(state,action:PayloadAction<List>){
            state.cartItems.push(action.payload);
        },
        removeLocalCart(state,action:PayloadAction<string>){
            state.cartItems = state.cartItems.filter(items=>items.id!==action.payload);
        }
   },
    extraReducers:builder=>{
        builder
        .addCase(fetchCartItems.pending,state=>{
            state.loading=true;
        })
        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
        })
        .addCase(fetchCartItems.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message ?? "Failed";
        })

    }

});

export default CartItemSlice.reducer
export const {addLocalCart,removeLocalCart} = CartItemSlice.actions;