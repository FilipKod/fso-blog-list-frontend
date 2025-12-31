import React, { useContext } from "react";
import { useParams } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import Comments from "./Comments";
import useBlogs from "../hooks/useBlogs";
import { AuthContext } from "../contexts/authContext";

function PostDetail() {
  const { postId } = useParams();
  const { likePostMutation, deletePostMutation } = useBlogs();

  const { data: blogs } = useBlogs();

  const user = useContext(AuthContext);

  if (!blogs) return null;

  const blog = blogs.find((b) => b.id === postId);

  if (!blog) return null;

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
              onClick={() => likePostMutation.mutate(blog)}
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
            onClick={() => deletePostMutation.mutate(blog)}
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
