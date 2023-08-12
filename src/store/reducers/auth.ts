import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthInterface {
  id: string;
  name: string;
  role: string;
}

const initialState: AuthInterface = {
  id: "",
  name: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
    update: (state, action: PayloadAction<AuthInterface>) => {
      state = action.payload;
    },
  },
});

export const { clear, update } = authSlice.actions;
export default authSlice.reducer;
