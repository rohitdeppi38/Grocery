import { configureStore } from "@reduxjs/toolkit";
import cartItems from '../features/items/cartItems'
import wishItems from '../features/items/wishList'

const store = configureStore({
    reducer:{
        cartItems:cartItems,
        wishItems:wishItems,
    }
});

export default store;

//exporting type of the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;