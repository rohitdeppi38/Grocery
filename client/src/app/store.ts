import { configureStore } from "@reduxjs/toolkit";
import cartItems from '../features/items/cartItems'

const store = configureStore({
    reducer:{
        items:cartItems,
    }
});

export default store;

//exporting type of the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;