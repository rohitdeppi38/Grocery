
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../../types/itemList";



{/** fetch Cart Items of the user */}
export const fetchCartItems = createAsyncThunk<List[],void>('items/fetchCartItems',
    async()=>{
    const res = await axios.get('/my api');
    return res.data;
})

{/**post cart items of the user */}

export const postCartItems = createAsyncThunk<void,List[]>('items/postCartItems',
    async(item,thunkApi)=>{
        try{
            const res = await axios.post('/my post api',item);
            return res.data;
        }catch(error:any){
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "somthing went wrong"
            );
        }
    }
)