import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
  },
});

const { setAuth } = authSlice.actions;

export const authUser = (user) => {
  return (dispatch) => {
    dispatch(setAuth(user));
  };
};

export default authSlice.reducer;
