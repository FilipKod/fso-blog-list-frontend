import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createNewPost } from "../reducers/blogReducer";

function PostForm({ user }) {
  const dispatch = useDispatch();

  const [postTitle, setPostTitle] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const handleCreateForm = async (event) => {
    event.preventDefault();

    const postData = {
      title: postTitle,
      url: postUrl,
    };

    dispatch(createNewPost(postData));

    setPostTitle("");
    setPostUrl("");
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleCreateForm}>
        <div>
          <label htmlFor="postTitle">
            title:
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              onChange={({ target }) => setPostTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="postAuthor">
            author:
            <input type="text" id="postAuthor" value={user.name} disabled />
          </label>
        </div>

        <div>
          <label htmlFor="postUrl">
            url:
            <input
              type="text"
              id="postUrl"
              value={postUrl}
              onChange={({ target }) => setPostUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
export default PostForm;

PostForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
