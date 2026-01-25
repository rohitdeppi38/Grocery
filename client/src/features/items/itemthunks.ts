import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../types/itemList";


export const fetchItems = createAsyncThunk<List[],void>('items/fetchItems',
    async()=>{
    const res = await axios.get('/my api');
    return res.data;
})
