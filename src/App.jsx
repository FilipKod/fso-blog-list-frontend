import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { fetchInitialPosts } from "./reducers/blogReducer";
import { authUser } from "./reducers/authReducer";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import UsersList from "./pages/Users/UsersList";
import UserDetail from "./pages/Users/UserDetail";

export default function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchInitialPosts());
  }, [dispatch]);

  useEffect(() => {
    const userStorage = window.localStorage.getItem("loggedAppUser");
    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      dispatch(authUser(userObj));
      blogService.setToken(userObj.token);
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const userFromLogin = await loginService.login({ username, password });

      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify(userFromLogin)
      );
      blogService.setToken(userFromLogin.token);
      dispatch(authUser(userFromLogin));
      setUsername("");
      setPassword("");
      dispatch(setNotification("user successfuly logged in", "ok", 5));
    } catch (error) {
      if (error.response) {
        dispatch(setNotification(error.response.data.error, "error", 5));
      }
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>

      <Notification notification={notification} />

      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">
            username
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    dispatch(authUser(null));
    blogService.setToken(null);
  };

  return (
    <div>
      {!user && loginForm()}

      <h2>blogs</h2>

      {user && (
        <div>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
