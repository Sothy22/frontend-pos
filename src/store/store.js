import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Import slice for configs
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";
import cartReducer from "./CartSlice";
import refreshReducer from "./refreshSlice";
import tokenReducer from "./tokenSlice";

// import storage from "redux-persist/lib/storage"; // for store state in local storage
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

import { persistReducer, persistStore } from "redux-persist";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     user: userReducer,
//   },
// });

// ============= Redux Persist ============
// PersistConfigs (local storage)
const persistConfigs = {
  key: "root",
  storage,
  whitelist: ["user", "counter", "users", "cart", "refresh", "token"],
};

// Combine Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  users: usersReducer,
  cart: cartReducer,
  refresh: refreshReducer,
  token: tokenReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfigs, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
