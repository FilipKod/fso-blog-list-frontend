import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="h2" marginY={4}>
        {blog.title}
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>Url:</strong> {blog.url}
        </Typography>
        <Box marginY={0.15}>
          <Typography variant="body1">
            <strong>likes:</strong> {blog.likes}
            <Button
              variant="contained"
              color="info"
              size="small"
              type="button"
              sx={{ ml: 1.5 }}
              onClick={() => dispatch(likePost(blog))}
            >
              like
            </Button>
          </Typography>
        </Box>
        <Typography variant="body1">
          <strong>Author:</strong> {blog.author.name}
        </Typography>
        {user && (
          <Button
            variant="contained"
            color="warning"
            sx={{ my: 2 }}
            className="removeBtn"
            type="button"
            size="small"
            onClick={() => handleRemoveButton(blog)}
          >
            remove post
          </Button>
        )}
        <Comments comments={blog.comments} />
      </Box>
    </Box>
  );
}
export default PostDetail;
