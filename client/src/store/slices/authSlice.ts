import { createSlice } from "@reduxjs/toolkit";
import { UserWithTokenType } from "../../types/user.types";
import { authApi } from "../services/auth";
import { RootState } from "../main";

interface InitialState {
  user: UserWithTokenType | null,
  isAuthenticated: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;