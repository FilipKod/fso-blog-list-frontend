import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { likePost, deletePost } from "../reducers/blogReducer";
import Comments from "./Comments";

function PostDetail() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);

  if (!blogs) return null;

  const blog = blogs.find((b) => b.id === postId);

  if (!blog) return null;

  const handleRemoveButton = (blogData) => {
    dispatch(deletePost(blogData));
    navigate("/");
  };

  return (
    <>
      <h2>{blog.title}</h2>
      <div id="post-details">
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          <button type="button" onClick={() => dispatch(likePost(blog))}>
            like
          </button>
        </div>
        <div>{blog.author.name}</div>
        <div>
          {user && (
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveButton(blog)}
            >
              remove
            </button>
          )}
        </div>
        <Comments comments={blog.comments} />
      </div>
    </>
  );
}
export default PostDetail;
