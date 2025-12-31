import React, { useContext } from "react";
import { Link } from "react-router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import blogService from "../services/blogs";
import { AuthActionsContext, AuthContext } from "../contexts/authContext";

function Navigation() {
  const authContext = useContext(AuthActionsContext);
  const user = useContext(AuthContext);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    authContext.setAuth(null);
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
