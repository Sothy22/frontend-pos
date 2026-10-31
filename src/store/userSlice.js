import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", password: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({ ...action.payload }),
    logout: () => initialState,
  },
});

// Export actions
export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
