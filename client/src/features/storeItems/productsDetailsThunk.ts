import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type {List} from "../../types/itemList"

{/**fetch Items from the data base to display in the UI*/}

export const fetchProducts = createAsyncThunk<List[],void>("products/fetch",
    async ()=>{
        const res = await axios.get('http://localhost:8000');
        return res.data;
})