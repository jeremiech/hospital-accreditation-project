import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/app";
import authReducer from "./reducers/auth";

export const store = configureStore({
  reducer: { app: appReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
