import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import thunk from "redux-thunk";
import { authApi } from "@/services/auth";
import { userApi } from "@/services/user";
import { patientApi } from "@/services/patient";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import appReducer, { AppState } from "@/store/slice/AppSlice";
import authReducer, { AuthState } from "@/store/slice/AuthSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export interface CombinedState {
  app?: AppState;
  auth?: AuthState;
}

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    blacklist: [
      authApi.reducerPath,
      userApi.reducerPath,
      patientApi.reducerPath,
    ],
  },
  combineReducers({
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      thunk,
      authApi.middleware,
      userApi.middleware,
      patientApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
