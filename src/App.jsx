import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import PostDetail from "./components/PostDetail";
import {
  NotificationActionsContext,
  NotificationContext,
} from "./contexts/notificationContext";
import Home from "./pages/Home";
import UserDetail from "./pages/Users/UserDetail";
import UsersList from "./pages/Users/UsersList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { AuthActionsContext, AuthContext } from "./contexts/authContext";

export default function App() {
  const authContext = useContext(AuthActionsContext);
  const user = useContext(AuthContext);

  const notification = useContext(NotificationContext);
  const { setNotification } = useContext(NotificationActionsContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userStorage = window.localStorage.getItem("loggedAppUser");
    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      authContext.setAuth(userObj);
      blogService.setToken(userObj.token);
    }
  }, [authContext]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const userFromLogin = await loginService.login({ username, password });

      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify(userFromLogin)
      );
      blogService.setToken(userFromLogin.token);
      authContext.setAuth(userFromLogin);
      setUsername("");
      setPassword("");
      setNotification("user successfuly logged in", "ok", 5);
    } catch (error) {
      if (error.response) {
        setNotification(error.response.data.error, "error", 5);
      }
    }
  };

  const loginForm = () => (
    <Box component="section">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        log in to application
      </Typography>

      <Box component="form" onSubmit={handleLoginSubmit}>
        <Stack direction="row">
          <TextField
            sx={{ mr: 1 }}
            id="username"
            label="username"
            variant="outlined"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />

          <TextField
            sx={{ mr: 1 }}
            id="password"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button variant="contained" type="submit">
            login
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <Navigation />

      <Container sx={{ pt: 8 }}>
        <Notification notification={notification} />

        {!user && loginForm()}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:postId" element={<PostDetail />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </Container>
    </>
  );
}
