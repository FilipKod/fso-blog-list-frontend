import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function Blog({ blog }) {
  return (
    <div className="post">
      <span>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </span>
    </div>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
