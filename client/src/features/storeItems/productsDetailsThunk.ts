import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type {List} from "../../types/itemList"

{/**fetch Items from the data base to display in the UI*/}

export const fetchProducts = createAsyncThunk<List[],void,{ rejectValue: string }>(
  "products/fetch",
  async (_, thunkAPI) => {
    //temparary link
    try {
      const res = await axios.get('all_item.json');
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  });