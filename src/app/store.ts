import { configureStore } from "@reduxjs/toolkit";
import cartItems from '../features/items/cartItems'

const store = configureStore({
    reducer:{
        items:cartItems,
    }
});

export default store;