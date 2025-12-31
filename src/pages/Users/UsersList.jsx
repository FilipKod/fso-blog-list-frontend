import React from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useUsers from "../../hooks/useUsers";

function Users() {
  const { data: users } = useUsers();

  return (
    <>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Users
      </Typography>

      {users && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col" aria-label="names" />
              <TableCell scope="col">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
export default Users;
