import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: { isLoggedIn: false },
};

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProfile: (state, action) => {
      state.profile = { ...action.payload };
    },
    removeProfile: (state, action) => {
      state.profile = { isLoggedIn: false };
    },
  },
});

export const { addProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;
