import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../types/itemList"

{/**fetch Items from the data base to display in the UI*/ }

export const fetchProducts = createAsyncThunk<List[], void, { rejectValue: string }>(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:8000/api/product');
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  });