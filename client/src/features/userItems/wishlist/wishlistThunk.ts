import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../../types/itemList";





{/** fetch wish list items of the user  */ }
export const fetchWishList = createAsyncThunk<List[], string>('items/fetchWish',
    async (userId) => {
        const res = await axios.get(`http://localhost:8000/api/wishlist/${userId}/get`);
        return res.data;
    }
)


{/**post wish list items of the user  */ }

export const postWishItems = createAsyncThunk<void, { userId: string, items: List[] }>("items/postWish",
    async ({ userId, items }, thunkApi) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/wishlist/${userId}/add`, items);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "somthing went wrong"
            );
        }
    });