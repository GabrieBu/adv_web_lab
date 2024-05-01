import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../services/db/authentication/apiAuth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const { mutate: register_api, isLoading } = useMutation({
    mutationFn: (auth) => registerApi(auth),
    onSuccess: () => {
      navigate("/login");
    },
  });

  return { register_api, isLoading };
}
