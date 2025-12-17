import React, { useState } from "react";
import PropTypes from "prop-types";

function Blog({ blog, onLike, onRemove, user }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="post">
      <span>{blog.title}</span>
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
        <div id="post-details">
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
            <button type="button" onClick={() => onLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.author.name}</div>
          <div>
            {user && (
              <button
                className="removeBtn"
                type="button"
                onClick={() => onRemove(blog)}
              >
                remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

Blog.defaultProps = {
  user: null,
};
