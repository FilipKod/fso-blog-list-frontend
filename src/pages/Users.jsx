import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../reducers/userReducer";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>

      {users && (
        <table>
          <thead>
            <tr>
              <th scope="col" aria-label="names" />
              <th scope="col">blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default Users;
