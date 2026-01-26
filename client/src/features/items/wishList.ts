import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWishList, removeWishItems } from "./itemthunks";
import { List } from "../../types/itemList";


interface ItemState {
    wishItems:List[];
    loading: boolean;
    error: string | null;
}

const initialState:ItemState={
    wishItems:[],
    loading:false,
    error:null
}

const wishSlice = createSlice({
    name:"wishItems",
    initialState,
    reducers:{
        addWishLocal(state,action:PayloadAction<List>){
            state.wishItems.push(action.payload);
        },
        removeWishLocal(state,action:PayloadAction<string>){
            state.wishItems = state.wishItems.filter(items=>items.id!==action.payload);
        }
    },
    extraReducers:builders=>{
        builders

        //fetch the wish items form the database
        .addCase(fetchWishList.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(fetchWishList.fulfilled,(state,action)=>{
            state.loading=false;
            state.wishItems=action.payload;
        })
        .addCase(fetchWishList.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message ?? "Failed";
        })

        //Remove the wish items form the database 
        
        .addCase(removeWishItems.pending,(state)=>{
            state.loading=true;
        })
        .addCase(removeWishItems.fulfilled,(state)=>{
            state.loading=false;
        })
        .addCase(removeWishItems.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message ?? "Failed";
        })
    }
})

export default wishSlice.reducer;
export const {addWishLocal,removeWishLocal} = wishSlice.actions;