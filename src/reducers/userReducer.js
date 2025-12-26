import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

const { setUsers } = userSlice.actions;

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
