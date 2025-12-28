import PropTypes from "prop-types";
import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentForm from "./CommentForm";

function Comments({ comments }) {
  return (
    <Box>
      <Typography variant="h4" marginY={2}>
        Comments
      </Typography>
      <CommentForm />
      {comments && (
        <List>
          {[...comments]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((comment) => (
              <ListItem key={comment.id} sx={{ my: 0.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ height: 36, width: 36 }}>
                    <AccountCircleIcon fontSize="medium" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{comment.message}</ListItemText>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
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
