import React from "react";
import PropTypes from "prop-types";

function Notification({ notification }) {
  if (notification === null) return null;

  return (
    <div className={`notification ${notification.status}`}>
      {notification.message}
    </div>
  );
}
export default Notification;

Notification.propTypes = {
  notification: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
