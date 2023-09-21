import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingsProp {
  id: string | number;
  key: string;
  value: string;
}

interface MetricsProp {
  users: number;
  forms: number;
  patients: number;
  carePlans: number;
  formResponses: number;
}

export interface AppState {
  darkMode?: boolean;
  openDrawer?: boolean;
  metrics?: MetricsProp;
  settings?: SettingsProp[];
}

const initialState: AppState = {
  settings: [],
  darkMode: false,
  openDrawer: false,
  metrics: { users: 0, forms: 0, patients: 0, carePlans: 0, formResponses: 0 },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clear: (state) => {
      state.metrics = initialState.metrics;
      state.darkMode = initialState.darkMode;
      state.settings = initialState.settings;
      state.openDrawer = initialState.openDrawer;
    },
    setSettings: (state, action: PayloadAction<SettingsProp[]>) => {
      state.settings = action.payload;
    },
    setDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setMetrics: (state, action: PayloadAction<MetricsProp>) => {
      state.metrics = action.payload;
    },
  },
});

export const { clear, setSettings, setDrawer, setMode, setMetrics } =
  appSlice.actions;

export default appSlice.reducer;
