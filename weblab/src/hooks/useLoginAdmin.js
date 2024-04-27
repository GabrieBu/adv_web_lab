import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/db/authentication/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLoginAdmin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (auth) => loginApi(auth),
    onSuccess: () => {
      navigate("/admin");
    },
    onError: (error) => {
      console.log("Error in useLogin: ", error.message);
      throw new Error(error.message);
    },
  });

  console.log(login);
  return { login, isLoading };
}
