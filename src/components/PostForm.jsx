import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="h4" sx={{ mt: 4, mb: 1 }}>
        create new
      </Typography>

      <Box component="form" onSubmit={handleCreateForm}>
        <TextField
          fullWidth
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={({ target }) => setPostTitle(target.value)}
          variant="outlined"
          label="Title"
        />

        <TextField
          fullWidth
          type="text"
          id="postAuthor"
          value={user.name}
          disabled
          label="Author"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <TextField
          fullWidth
          type="text"
          id="postUrl"
          value={postUrl}
          onChange={({ target }) => setPostUrl(target.value)}
          label="Url"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="success"
          sx={{ my: 1 }}
          type="submit"
        >
          create
        </Button>
      </Box>
    </Box>
  );
}
export default PostForm;

PostForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
