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
