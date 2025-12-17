import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

function Togglable({ children, buttonLabel, ref }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisible };
  });

  const visibleView = (
    <div>
      {children}
      <button type="button" onClick={toggleVisible}>
        cancel
      </button>
    </div>
  );

  const hiddenView = (
    <button type="button" onClick={toggleVisible}>
      {buttonLabel}
    </button>
  );

  return <div>{visible ? visibleView : hiddenView}</div>;
}

export default Togglable;

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  ref: PropTypes.func.isRequired,
};
