import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Typography,
  Link as MUILink,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

function Blog({ blog }) {
  return (
    <ListItem sx={{ my: 1.5 }}>
      <ListItemAvatar>
        <Avatar sx={{ height: 32, width: 32 }}>
          <FolderIcon fontSize="small" />
        </Avatar>
      </ListItemAvatar>
      <MUILink
        component={RouterLink}
        to={`/blogs/${blog.id}`}
        underline="always"
        color="textPrimary"
      >
        <Typography variant="h3" fontSize={24}>
          {blog.title}
        </Typography>
      </MUILink>
    </ListItem>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
