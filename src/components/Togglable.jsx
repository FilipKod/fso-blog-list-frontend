import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

function Togglable({ children, buttonLabel, ref }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisible };
  });

  const visibleView = (
    <div>
      {children}
      <Button type="button" onClick={toggleVisible} variant="outlined">
        cancel
      </Button>
    </div>
  );

  const hiddenView = (
    <Button type="button" onClick={toggleVisible} variant="outlined">
      {buttonLabel}
    </Button>
  );

  return <div>{visible ? visibleView : hiddenView}</div>;
}

export default Togglable;

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  ref: PropTypes.func.isRequired,
};
