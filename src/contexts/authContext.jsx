import React, { createContext, useReducer, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} AuthActions
 * @property {(user: Object) => void} setAuth
 */

export const AuthContext = createContext(null);

/** @type {React.Context<AuthActions | null>} */
export const AuthActionsContext = createContext(null);

const initialValue = null;

const SET_USER = "set_user";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [value, dispatch] = useReducer(authReducer, initialValue);

  const setAuth = useCallback((user) => {
    dispatch({ type: SET_USER, payload: user });
  }, []);

  const actions = useMemo(
    () => ({
      setAuth,
    }),
    [setAuth]
  );

  return (
    <AuthContext value={value}>
      <AuthActionsContext value={actions}>{children}</AuthActionsContext>
    </AuthContext>
  );
}

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
