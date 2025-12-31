import React, { useRef, useContext } from "react";
import { Box, List } from "@mui/material";
import Blog from "../components/Blog";
import Togglable from "../components/Togglable";
import PostForm from "../components/PostForm";
import useBlogs from "../hooks/useBlogs";
import { AuthContext } from "../contexts/authContext";

function Home() {
  const { data: blogs } = useBlogs();
  const user = useContext(AuthContext);

  const newPostRef = useRef();

  return (
    <Box sx={{ mt: 4 }}>
      {user && (
        <Togglable buttonLabel="create new blog" ref={newPostRef}>
          <PostForm user={user} />
        </Togglable>
      )}

      {blogs && (
        <Box sx={{ mt: 4 }}>
          <List>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
export default Home;
