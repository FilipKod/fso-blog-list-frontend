import React from "react";
import { useParams } from "react-router";
import useUsers from "../../hooks/useUsers";

function UserDetail() {
  const { userId } = useParams();
  const { data: users } = useUsers();

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
