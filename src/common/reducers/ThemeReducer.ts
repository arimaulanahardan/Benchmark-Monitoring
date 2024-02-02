import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const ThemeReducer = reducer.reducer;
export const ThemeAction = reducer.actions;
