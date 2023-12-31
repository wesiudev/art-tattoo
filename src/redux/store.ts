import { configureStore } from "@reduxjs/toolkit";

import tattoosReducer from "./slices/tattoosSlice"; // import the new reducer
import postsReducer from "./slices/posts"; // import the new reducer
import shopSlice from "./slices/shopSlice";
export const store = configureStore({
  reducer: {
    tattoos: tattoosReducer, // add the new reducer to the store
    posts: postsReducer,
    shop: shopSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
