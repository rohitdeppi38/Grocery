import {createSlice,type PayloadAction} from "@reduxjs/toolkit";

import type{List} from "../../types/itemList"

interface ItemState {
    items:List[];
}

const itemSlice = createSlice({
    name:"items",
    initialState:{
        items:[],
    } as ItemState,
    reducers:{
        addItems(state,action:PayloadAction<List>){
            state.items.push(action.payload);
        },
        removeItems(state,action:PayloadAction<number>){
            state.items=state.items.filter(item=>item.id!==action.payload);
        }
    }
})

export const {addItems,removeItems} = itemSlice.actions;
export default itemSlice.reducer