import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
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
    <AppBar color="default" variant="outlined">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">BlogApp</Typography>
          <Toolbar>
            <Button component={Link} to="/" color="secondary">
              blog
            </Button>
            <Button component={Link} to="/users" color="secondary">
              users
            </Button>
          </Toolbar>
        </Box>
        {user && (
          <Typography variant="caption">
            {user.name} logged in
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              color="info"
              type="button"
              className="nav__btn-logout"
              onClick={handleLogout}
            >
              logout
            </Button>
          </Typography>
        )}
      </Container>
    </AppBar>
  );
}
export default Navigation;
