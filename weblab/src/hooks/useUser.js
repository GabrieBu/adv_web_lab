import { useQuery } from "@tanstack/react-query";
import { getUserLogged, getUser } from "../services/db/authentication/apiAuth";

export function useUser() {
  // First, attempt to fetch the logged-in user
  const { isLoading: isLoggedUserLoading, data: loggedUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLogged,
  });

  // Fetch detailed user data if there is a logged-in user
  const { data: userPoint, isLoading: isUserPointLoading } = useQuery({
    queryKey: ["userPoint"],
    queryFn: () => getUser(loggedUser?.id),
    enabled: !!loggedUser, // Only run this query if there is a logged-in user
  });

  // Define the anonymous user ID
  const anonymousUserId = "c11289ee-a8e7-4fcd-a83d-d5f95a5e9fe5";

  // Fetch the anonymous user data if there is no logged-in user
  const { data: anonymousUser, isLoading: isAnonymousUserLoading } = useQuery({
    queryKey: ["anonymousUser"],
    queryFn: () => getUser(anonymousUserId),
    enabled: !loggedUser, // Only run this query if there is no logged-in user
  });

  // Determine which user data to return
  const user = loggedUser ? userPoint : anonymousUser;

  // Determine the loading state
  const isLoading =
    isLoggedUserLoading ||
    (loggedUser ? isUserPointLoading : isAnonymousUserLoading);

  return {
    isLoading,
    id: user?.id,
    user, // return the user data
  };
}
