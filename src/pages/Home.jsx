import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import Togglable from "../components/Togglable";
import PostForm from "../components/PostForm";

function Home() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);

  const newPostRef = useRef();

  return (
    <>
      {user && (
        <Togglable buttonLabel="create new blog" ref={newPostRef}>
          <PostForm user={user} />
        </Togglable>
      )}

      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)}
    </>
  );
}
export default Home;
