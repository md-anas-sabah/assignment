import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.items.push({ ...newItem, amount: 1 });
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    increaseItemAmount: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    decreaseItemAmount: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.totalAmount = amount;
      state.totalPrice = total;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemAmount,
  decreaseItemAmount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
