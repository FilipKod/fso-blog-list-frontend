import React, { useState } from "react";
import PropTypes from "prop-types";

function PostForm({ user, createPost }) {
  const [postTitle, setPostTitle] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const handleCreateForm = async (event) => {
    event.preventDefault();

    createPost({
      title: postTitle,
      url: postUrl,
    });

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
  createPost: PropTypes.func.isRequired,
};
