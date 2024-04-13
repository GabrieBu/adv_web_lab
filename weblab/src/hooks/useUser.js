import { useQuery } from "@tanstack/react-query";
import { getUserLogged } from "../services/db/authentication/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLogged,
  });

  return {
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
