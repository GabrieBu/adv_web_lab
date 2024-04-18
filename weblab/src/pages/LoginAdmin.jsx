import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Loader from "../loaders/Loader";

function LoginAdmin() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  function onSubmit(info) {
    login(info);
    navigate("/admin");
  }

  return (
    <div>
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "This field is required",
            })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
            })}
          />
        </div>
        <button type="submit">{!isLoading ? "Login" : <Loader />}</button>
      </form>
    </div>
  );
}

export default LoginAdmin;
