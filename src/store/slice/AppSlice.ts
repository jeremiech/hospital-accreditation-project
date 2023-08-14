import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingsProp {
  id: string | number;
  key: string;
  value: string;
}

export interface AppState {
  darkMode?: boolean;
  openDrawer?: boolean;
  settings?: SettingsProp[];
}

const initialState: AppState = {
  darkMode: false,
  openDrawer: false,
  settings: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clear: (state) => {
      state.darkMode = initialState.darkMode;
      state.openDrawer = initialState.openDrawer;
      state.settings = initialState.settings;
    },
    setSettings: (state, action: PayloadAction<Array<SettingsProp>>) => {
      state.settings = action.payload;
    },
    setDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { clear, setSettings, setDrawer, setMode } = appSlice.actions;

export default appSlice.reducer;
