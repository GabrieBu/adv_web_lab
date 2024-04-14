import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onSubmit(info) {
    console.log(info);
    navigate("/admin");
  }

  return (
    <div>
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginAdmin;
