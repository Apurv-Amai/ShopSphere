import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,

  user: null,

  isAuthenticated: false,

  loading: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;

      state.isAuthenticated = true;
    },

    restoreLogin: (state, action) => {
      state.token = action.payload;

      state.isAuthenticated = true;
    },

    setUser: (state, action) => {
      state.user = action.payload;

      state.loading = false;
    },

    logout: (state) => {
      state.token = null;

      state.user = null;

      state.isAuthenticated = false;

      state.loading = false;
    },

    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginSuccess,

  restoreLogin,

  setUser,

  logout,

  finishLoading,
} = authSlice.actions;

export default authSlice.reducer;
