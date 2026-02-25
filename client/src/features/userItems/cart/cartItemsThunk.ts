import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../../types/itemList";



{/** fetch Cart Items of the user */}
export const fetchCartItems = createAsyncThunk<List[],void>('items/fetchCartItems',
    async()=>{
    const res = await axios.get('/my api');
    return res.data;
})

