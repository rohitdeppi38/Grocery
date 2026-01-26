import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { List } from "../../types/itemList";
import { thunk } from "redux-thunk";

{/** fetch Cart Items of the user */}
export const fetchCartItems = createAsyncThunk<List[],void>('items/fetchCartItems',
    async()=>{
    const res = await axios.get('/my api');
    return res.data;
})

{/** fetch wish list items of the user  */}
export const fetchWishList = createAsyncThunk<List[],void>('items/fetchWish',
    async ()=>{
        const res = await axios.get('/my wish api');
        return res.data;
    }
)
{/** send the cart items to the data base */}

export const sendCartItems = createAsyncThunk<void,List[]>('items/sendCartItems',
    async()=>{
        const res = await axios.post('/my Cart Items');
        return ;
    }
)


{/**send the wish item to the database*/}

export const sendWishItems = createAsyncThunk<void,List[]>('items/sendWishItems',
    async ()=>{
        const res = await axios.post('/my wish items');
        return ;
    }
)


{/**sync request first change the local state and then change the database Cart*/}

export const remvoeCartItems = createAsyncThunk<void,string,{ rejectValue: string }>('items/removeCartItems',
    async (productId,thunkAPI)=>{
       try{
         const res = await axios.delete(`/remove from my cart ${productId}`);
       }catch(error){
        return thunkAPI.rejectWithValue("failed to delete the cart item");
       }
    }
)

{/**sync request first change the lcoal state and then change the database Wish items */}

export const removeWishItems = createAsyncThunk<void,string,{ rejectValue: string }>('items/remvoeWishItems',
    async (productId,thunkAPI)=>{
        try {
            const res = await axios.delete(`/remove from my wish list ${productId}`);
        } catch (error) {
            return thunkAPI.rejectWithValue("failed to delete the wish Item");
        }
    }
)