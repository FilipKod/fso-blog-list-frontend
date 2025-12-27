import PropTypes from "prop-types";
import React from "react";
import CommentForm from "./CommentForm";

function Comments({ comments }) {
  return (
    <div>
      <h3>Comments</h3>
      <CommentForm />
      {comments && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comments;

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};
