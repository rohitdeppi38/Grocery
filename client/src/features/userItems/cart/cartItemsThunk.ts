
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../../types/itemList";



{/** fetch Cart Items of the user */ }
export const fetchCartItems = createAsyncThunk<List[], string>('items/fetchCartItems',
    async (userId) => {
        const res = await axios.get(`http://localhost:8000/api/cart/${userId}/get`);
        return res.data;
    })

{/**post cart items of the user */ }

export const postCartItems = createAsyncThunk<void, { userId: string, item: List[] }>('items/postCartItems',
    async ({ userId, item }, thunkApi) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/cart/${userId}/addToCart`, item);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "somthing went wrong"
            );
        }
    }
)