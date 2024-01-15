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
import { formApi } from "@/services/form";
import { patientApi } from "@/services/patient";
import storage from "redux-persist/lib/storage";
import { defaultApi } from "@/services/default";
import { surgeryApi } from "@/services/surgery";
import { messageApi } from "@/services/message";
import { admissionApi } from "@/services/admission";
import { anesthesiaApi } from "@/services/anesthesia";
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
      formApi.reducerPath,
      defaultApi.reducerPath,
      messageApi.reducerPath,
      patientApi.reducerPath,
      surgeryApi.reducerPath,
      admissionApi.reducerPath,
      anesthesiaApi.reducerPath,
    ],
  },
  combineReducers({
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [defaultApi.reducerPath]: defaultApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [surgeryApi.reducerPath]: surgeryApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [admissionApi.reducerPath]: admissionApi.reducer,
    [anesthesiaApi.reducerPath]: anesthesiaApi.reducer,
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
      formApi.middleware,
      defaultApi.middleware,
      messageApi.middleware,
      patientApi.middleware,
      surgeryApi.middleware,
      admissionApi.middleware,
      anesthesiaApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
