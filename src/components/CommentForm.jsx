import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createNewComment } from "../reducers/blogReducer";

function CommentForm() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const commentData = {
      message: value,
    };

    dispatch(createNewComment(postId, commentData));
    setValue("");
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">add comment</button>
    </form>
  );
}
export default CommentForm;
