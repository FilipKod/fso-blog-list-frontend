import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

function useUsers() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  return {
    data: query.data,
  };
}

export default useUsers;
