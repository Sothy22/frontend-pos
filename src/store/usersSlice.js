import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add user
    addUser: (state, action) => {
      if (!Array.isArray(state)) return [action.payload];
      state.push(action.payload);
    },

    // Update user by user id
    updateUser: (state, actions) => {
      const { id, data } = actions.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },

    // delete user by user id
    deleteUser: (state, action) => {
      return state.filter((item) => item?.id !== action.payload);
    },
  },
});

// Export actions
export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
