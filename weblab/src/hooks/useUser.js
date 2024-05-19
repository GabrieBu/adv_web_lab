import { useQuery } from "@tanstack/react-query";
import { getUserLogged, getUser } from "../services/db/authentication/apiAuth";

export function useUser() {
  // First, attempt to fetch the logged-in user
  const { isLoading, data: loggedUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLogged,
  });

  // Define the anonymous user ID
  const anonymousUserId = "c11289ee-a8e7-4fcd-a83d-d5f95a5e9fe5";

  const { data: anonymousUser } = useQuery({
    queryKey: ["anonymousUser"],
    queryFn: () => getUser(anonymousUserId),
    enabled: !loggedUser, // Only run this query if there is no logged-in user
  });

  const user = loggedUser || anonymousUser;

  return {
    isLoading,
    id: user?.id,
    user,
  };
}
