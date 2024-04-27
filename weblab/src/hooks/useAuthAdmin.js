import { useQuery } from "@tanstack/react-query";
import { getUserLogged } from "../services/db/authentication/apiAuth";
import { getAdmin } from "../services/db/authentication/apiAuth";

export function useAuthAdmin() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserLogged,
  });

  const {
    isLoading: isLoadingAdmin,
    data: admin,
    fetchStatus: fetchAdmin,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: () => getAdmin(user.id),
  });

  return {
    isLoading: isLoading || isLoadingAdmin,
    isAuthenticated: user?.role === "authenticated" && admin?.id === user?.id,
    fetchStatus: fetchAdmin,
    role: admin?.id_role,
    id: admin?.id,
  };
}
