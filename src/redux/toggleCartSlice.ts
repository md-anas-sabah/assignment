import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleCartState {
  isOpenCart: boolean;
}

const initialState: ToggleCartState = {
  isOpenCart: false,
};

const toggleCartSlice = createSlice({
  name: "toggleCart",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpenCart = !state.isOpenCart;
    },
    closeCart: (state) => {
      state.isOpenCart = false;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenCart = action.payload;
    },
  },
});

export const { toggle, closeCart, setCartOpen } = toggleCartSlice.actions;
export default toggleCartSlice.reducer;

export type { ToggleCartState };
