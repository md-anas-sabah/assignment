import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import toggleCartReducer from "./toggleCartSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    toggleCart: toggleCartReducer,
    cart: cartReducer,
  },
});

export default store;
