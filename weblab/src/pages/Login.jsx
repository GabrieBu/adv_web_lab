import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import Loader from "../loaders/Loader";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/db/authentication/apiAuth";
import { validateEmail } from "../services/db/validation";
import useTitle from "../hooks/useTitle";

function Login() {
  useTitle("Login");
  const [display, setDisplay] = useState(false);
  const { register, handleSubmit } = useForm();
  const { register: register_r, handleSubmit: handleSubmit_r } = useForm();
  const { login, isLoading } = useLogin();
  const [errorMessages, setErrorMessages] = useState("");

  async function onSubmit(auth) {
    if (!validateEmail(auth.email)) {
      setErrorMessages("Please enter a valid email address");
      return;
    }

    if (!login(auth)) {
      setErrorMessages("Invalid email or password");
    } else {
      login(auth);
    }
  }

  function onResetPassword(obj) {
    if (!validateEmail(obj.email)) {
      alert("Email not valid!");
    } else {
      resetPassword(obj.email);
      alert("Email sent");
    }
  }
  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10">
          <p></p>
          <h2 className="text-success">Log in</h2>
          <p></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="col-sm-2 col-form-label text-sm-right"
              >
                Email
              </label>
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
            </div>
            {errorMessages && <p className="text-danger">{errorMessages}</p>}
            <p></p>
            <button type="submit" className="btn btn-success">
              {!isLoading ? "Login" : <Loader />}
            </button>
          </form>
          <p></p>
          <div
            className="container rounded-lg bg-light p-4"
            style={{ marginTop: "5vh" }}
          >
            <Link
              to="/home"
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              Continue without Log In
            </Link>
          </div>
          <p></p>
          <div className="container rounded bg-light p-4">
            <a
              onClick={() => setDisplay((i) => !i)}
              className="text-dark"
              style={{
                padding: "10px 20px",
                border: "none",
                marginBottom: "20px",
                textDecoration: "none",
              }}
            >
              Reset password
            </a>

            {display ? (
              <form onSubmit={handleSubmit_r(onResetPassword)}>
                <label htmlFor="email">Insert a valid email</label>

                <input
                  id="email"
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  {...register_r("email", {
                    required: "This field is required",
                  })}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#198754",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "10px",
                  }}
                >
                  Send email
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
          <div className="container" style={{ marginTop: "20vh" }}>
            <p className="small text-muted" style={{ marginBottom: "0" }}>
              If you are a new user
            </p>
            <div className="container rounded bg-light p-4">
              <Link
                to="/register"
                className="text-success"
                style={{ textDecoration: "none" }}
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
