import { useQuery } from "@tanstack/react-query";
import { getUserLogged } from "../services/db/authentication/apiAuth";
import { getUser } from "../services/db/authentication/apiAuth";

//FIX AUTH USER

export function useAuthUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserLogged,
  });

  const {
    isLoading: isLoadingUser,
    data: user_auth,
    fetchStatus: fetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(user.id),
  });

  return {
    isLoading: isLoading || isLoadingUser,
    isAuthenticated:
      user?.role === "authenticated" && user_auth?.id === user?.id,
    fetchStatus: fetchUser,
  };
}
