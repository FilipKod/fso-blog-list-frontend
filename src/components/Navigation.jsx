import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { authUser } from "../reducers/authReducer";
import blogService from "../services/blogs";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    dispatch(authUser(null));
    blogService.setToken(null);
  };

  return (
    <div className="nav">
      <Link to="/" className="nav__item">
        blog
      </Link>
      <Link to="/users" className="nav__item">
        users
      </Link>
      {user && (
        <span className="nav__item">
          {user.name} logged in
          <button
            type="button"
            className="nav__btn-logout"
            onClick={handleLogout}
          >
            logout
          </button>
        </span>
      )}
    </div>
  );
}
export default Navigation;
