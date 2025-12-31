import React, { useState } from "react";
import { useParams } from "react-router";
import { Box, Button, Stack, TextField } from "@mui/material";
import useBlogs from "../hooks/useBlogs";

function CommentForm() {
  const { postId } = useParams();
  const { newCommentMutation } = useBlogs();
  const [value, setValue] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const commentData = {
      message: value,
    };

    newCommentMutation.mutate({
      postId,
      commentData,
    });
    setValue("");
  };

  return (
    <Box component="form" onSubmit={handleSubmitForm}>
      <Stack direction="row">
        <TextField
          sx={{ flexGrow: 4, mr: 1 }}
          size="small"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Your comment"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ flexGrow: 1, ml: 1 }}
        >
          add comment
        </Button>
      </Stack>
    </Box>
  );
}
export default CommentForm;
