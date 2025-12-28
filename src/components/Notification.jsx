import React from "react";
import PropTypes from "prop-types";
import { AppBar, Typography } from "@mui/material";

function Notification({ notification }) {
  if (notification === null) return null;

  return (
    <AppBar
      position="static"
      color={notification.status === "error" ? "error" : "success"}
      sx={{ p: 3, m: 1, borderRadius: 1 }}
    >
      <Typography variant="body1">{notification.message}</Typography>
    </AppBar>
  );
}
export default Notification;

Notification.propTypes = {
  notification: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
