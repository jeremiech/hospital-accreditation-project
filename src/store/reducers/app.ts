import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppInterface {
  darkMode: boolean;
}

const initialState: AppInterface = { darkMode: false };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
    update: (state, action: PayloadAction<AppInterface>) => {
      state = action.payload;
    },
  },
});

export const { clear, update } = appSlice.actions;
export default appSlice.reducer;
