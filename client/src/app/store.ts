import { configureStore } from "@reduxjs/toolkit";
import cartItems from '../features/userItems/cart/cartItems'
import wishItems from '../features/userItems/wishlist/wishlist'
import productDetails from '../features/storeItems/productsDetails'

const store = configureStore({
    reducer:{
        productsDetails:productDetails,
        cartItems:cartItems,
        wishItems:wishItems,
    }
});

export default store;

//exporting type of the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;