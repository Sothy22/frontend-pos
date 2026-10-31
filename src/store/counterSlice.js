import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Action state
    increment: (state, action) => {
      //   state.value = state.value + 1;
      state.value += 1;
    },
    decrement: (state, action) => {
      //   state.value = state.value - 1;
      state.value -= 1;
    },
  },
});

// Export actions
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
