import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/db/authentication/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (auth) => loginApi(auth),
    onSuccess: () => {
      navigate("/profile");
    },
  });

  return { login, isLoading };
}
