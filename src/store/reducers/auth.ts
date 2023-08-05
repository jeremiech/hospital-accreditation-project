import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthInterface {
  name: string;
  email: string;
  role: string;
}

const initialState: AuthInterface = {
  name: "",
  email: "",
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
