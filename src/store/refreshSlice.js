import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    // Action state
    setRefresh: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Export actions
export const { setRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
