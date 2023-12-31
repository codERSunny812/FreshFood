import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";

//   passing slice into our store
const store = configureStore({
    reducer:{
        cart:cartSlice
    }
});

export default store;