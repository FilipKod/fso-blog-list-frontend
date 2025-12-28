import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Box, List } from "@mui/material";
import Blog from "../components/Blog";
import Togglable from "../components/Togglable";
import PostForm from "../components/PostForm";

function Home() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);

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
