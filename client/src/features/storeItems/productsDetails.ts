import { createSlice } from "@reduxjs/toolkit";

import type { List } from "../../types/itemList";
import { fetchProducts } from "./productsDetailsThunk";

interface itemState{
    items:List[];
    loading:boolean;
    error: string | null;
}

const initialState :itemState={
    items:[],
    loading:true,
    error:null
}

const productSlice = createSlice({
    name:"productDetails",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.items=action.payload;
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message ?? "Failed";
        });
    }
})

export default productSlice.reducer;
