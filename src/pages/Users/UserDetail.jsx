import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchAllUsers } from "../../reducers/userReducer";

function UserDetail() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (!users) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch]);

  if (!users) return null;

  const user = users.find((u) => u.id === userId);

  if (!user) return null;

  return (
    <>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
}
export default UserDetail;
