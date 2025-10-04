// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// --- Thunks ---
export const signIn = createAsyncThunk("auth/signIn", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.signIn(formData);
    return data; // { result, token }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Sign in failed");
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.signUp(formData);
    return data; // { result, token }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Sign up failed");
  }
});

// --- Initial State ---
const storedData = JSON.parse(localStorage.getItem("profile"));

const initialState = {
  user: storedData?.result || null,
  token: storedData?.token || null,
  loading: false,
  error: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { result, token } = action.payload;
      const profile = { result, token };
      localStorage.setItem("profile", JSON.stringify(profile));
      state.user = result;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Sign In ---
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { result, token } = action.payload;

        const profile = { result, token };
        localStorage.setItem("profile", JSON.stringify(profile));

        state.user = result;
        state.token = token;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // --- Sign Up ---
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { result, token } = action.payload;

        const profile = { result, token };
        localStorage.setItem("profile", JSON.stringify(profile));

        state.user = result;
        state.token = token;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },

});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
