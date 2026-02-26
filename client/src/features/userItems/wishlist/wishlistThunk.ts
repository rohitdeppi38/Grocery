import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../../types/itemList";





{/** fetch wish list items of the user  */}
export const fetchWishList = createAsyncThunk<List[],void>('items/fetchWish',
    async ()=>{
        const res = await axios.get('/my wish api');
        return res.data;
    }
)


{/**post wish list items of the user  */}

export const postWishItems = createAsyncThunk<void,List[]>("items/postWish",
    async (items,thunkApi)=>{
    try {
        const res = await axios.post("my post route",items);
        return res.data;
    } catch (error:any) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || "somthing went wrong"
        );
    }
});