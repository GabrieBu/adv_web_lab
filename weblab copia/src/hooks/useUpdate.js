import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/db/authentication/apiAuth";
import { useNavigate } from "react-router-dom";

export function useUpdate() {
  const navigate = useNavigate();

  const { mutate: update, isLoading } = useMutation({
    mutationFn: (auth) => updatePassword(auth),
    onSuccess: () => {
      navigate("/login");
    },
  });

  return { update, isLoading };
}
