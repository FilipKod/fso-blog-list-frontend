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
    addPost: (state, action) => {
      state.push(action.payload);
    },
    updatePost: (state, action) => {
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    removePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload.id);
    },
  },
});

const { setPosts, addPost, updatePost, removePost } = blogSlice.actions;

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
      dispatch(addPost(createdPost));
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

export const createNewComment = (postId, commentData) => {
  return async (dispatch) => {
    try {
      const postWithNewComment = await blogService.createComment(
        postId,
        commentData
      );
      dispatch(updatePost(postWithNewComment));
      dispatch(setNotification("a new comment added", "ok", 5));
    } catch (error) {
      dispatch(setNotification("create comment failed", "error", 5));
    }
  };
};

export const likePost = (blog) => {
  return async (dispatch) => {
    const optimisticPost = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updatePost(optimisticPost));

    try {
      const updatedPost = await blogService.update(optimisticPost);

      dispatch(updatePost(updatedPost));
    } catch (error) {
      dispatch(setNotification("Like error"), "error", 5);
    }
  };
};

export const deletePost = (blog) => {
  return async (dispatch) => {
    try {
      // eslint-disable-next-line no-alert
      const confirmed = window.confirm(
        `Remove blog ${blog.title} by ${blog.author.name}`
      );

      if (confirmed) {
        await blogService.remove(blog.id);

        dispatch(removePost(blog));
        dispatch(setNotification(`post ${blog.title} removed`, "ok", 5));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      dispatch(setNotification(errorMessage, "error", 15));
    }
  };
};

export default blogSlice.reducer;
