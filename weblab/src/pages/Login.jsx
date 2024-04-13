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
    <div className="container-fluid text-center">
    <div className="row justify-content-center">
      <div className="col-10">
      <p></p>
      <h2 className="text-success">Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            id="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password", {
              required: "Questo campo è obbligatorio",
            })}
          />
        </div>
        <p></p>
        <button type="submit" className="btn btn-success">
          {!isLoading ? "Login" : <Loader />}
        </button>
      </form>
      <p></p>
            <div className="container rounded bg-light p-4" style={{marginTop: '5vh'}}>
              <Link to="/home" className="text-dark" style={{ textDecoration: 'none'}}>Continue without Log In</Link>
            </div>
            <p></p>
            <div className="container rounded bg-light p-4">
              <Link to="#" className="text-dark" style={{ textDecoration: 'none'}}>Reset password</Link>
            </div>
            <p></p>
            <div className="container" style={{marginTop: '20vh'}}>
              <p className="small text-muted" style={{ marginBottom: '0'}}>If you are a new user</p>
              <div className="container rounded bg-light p-4">
                <Link to="/register" className="text-success" style={{ textDecoration: 'none'}}>Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;