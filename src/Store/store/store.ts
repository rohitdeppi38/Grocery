import { configureStore } from "@reduxjs/toolkit";
import cartItems from '../itemsSlice/cartItems'

const store = configureStore({
    reducer:{
        items:cartItems,
    }
});

export default store;