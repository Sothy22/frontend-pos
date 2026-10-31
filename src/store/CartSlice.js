import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action state

    // Add to cart
    addToCart: (state, actions) => {
      const id = actions.payload.id;
      const existing = state.find((item) => item?.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.push({ ...actions.payload, qty: 1 });
      }
    },

    // Increase cart (+)
    increaseCart: (state, actions) => {
      const id = actions.payload.id;
      const existing = state.find((item) => item?.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.push({ ...actions.payload, qty: 1 });
      }
    },

    // Increase cart (-)
    descreaseCart: (state, action) => {
      const id = action.payload.id;
      const cart = state.find((item) => item?.id === id);
      if (cart?.qty > 1) {
        cart.qty -= 1;
      } else if (cart) {
        return state.filter((item) => item?.id !== id);
      }
    },

    // clear cart
    clear: (state, action) => {
      const id = action.payload.id;
      return state.filter((item) => item?.id !== id);
    },

    // clear all
    clearAll: () => initialState,
  },
});

export const { addToCart, increaseCart, descreaseCart, clear, clearAll } =
  CartSlice.actions;
export default CartSlice.reducer;
