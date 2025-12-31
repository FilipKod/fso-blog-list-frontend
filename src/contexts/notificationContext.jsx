import React, { createContext, useReducer, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} NotificationActions
 * @property {(message: string, status: string, seconds: number) => void} setNotification
 */

export const NotificationContext = createContext(null);

/** @type {React.Context<NotificationActions | null>} */
export const NotificationActionsContext = createContext(null);

const initialValue = null;

const SET_NOTIFICATION = "set_notification";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};

function NotifificationProvider({ children }) {
  const [value, dispatch] = useReducer(notificationReducer, initialValue);

  const setNotification = useCallback((message, status, seconds) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message,
        status,
      },
    });
    setTimeout(() => {
      dispatch({ type: SET_NOTIFICATION, payload: null });
    }, seconds * 1000);
  }, []);

  const actions = useMemo(
    () => ({
      setNotification,
    }),
    [setNotification]
  );

  return (
    <NotificationContext value={value}>
      <NotificationActionsContext value={actions}>
        {children}
      </NotificationActionsContext>
    </NotificationContext>
  );
}

export default NotifificationProvider;

NotifificationProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
