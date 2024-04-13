import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import Loader from "../loaders/Loader";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login, isLoading } = useLogin();

  function onSubmit(auth) {
    if (!auth.email || !auth.password) return;
    login(auth);
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "This field is required",
          })}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Questo campo è obbligatorio",
          })}
        />
        <button type="submit"> {!isLoading ? "Login" : <Loader />}</button>
      </form>
      <h1>If you do not have an account</h1>{" "}
      <Link to="/register">Register here</Link>
    </div>
  );
}

export default Login;
