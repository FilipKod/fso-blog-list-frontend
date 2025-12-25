import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: null,
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
    createPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { setPosts, createPost } = blogSlice.actions;

export const fetchInitialPosts = () => {
  return async (dispatch) => {
    const posts = await blogService.getAll();
    dispatch(setPosts(posts));
  };
};

export const createNewPost = (postData) => {
  return async (dispatch) => {
    try {
      const createdPost = await blogService.create(postData);
      dispatch(createPost(createdPost));
      dispatch(
        setNotification(
          `a new blog ${createdPost.title} by ${createdPost.author.name} added`,
          "ok",
          5
        )
      );
    } catch (_error) {
      dispatch(setNotification("create post failed", "error", 5));
    }
  };
};

export default blogSlice.reducer;
