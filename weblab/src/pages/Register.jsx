import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { validateEmail } from "../services/db/validation";
import Loader from "../loaders/Loader";
import useTitle from "../hooks/useTitle";

function isStrongPassword(password) {
  const minLength = 8;
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);

  return password.length >= minLength && hasNumbers && hasSpecial && hasMixed;
}

function Register() {
  useTitle("Sign up!");
  const { register, handleSubmit } = useForm();
  const { register_api, isLoading } = useRegister();

  function onSubmit(auth) {
    if (!validateEmail(auth.email)) {
      alert("Email is not valid!");
      return;
    }
    if (!isStrongPassword(auth.password)) {
      alert(
        "Please enter a stronger password. Include numbers, special characters, and both uppercase and lowercase letters."
      );
      return;
    }
    if (auth.password !== auth.password_two) {
      alert("The passwords do not match. Please try again.");
      return;
    }
    register_api(auth); //create record in OAuth supabase and corresponding record in user table (same user id)
  }

  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10">
          <p></p>
          <h2 className="text-success">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                id="name"
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Name"
                {...register("name", {
                  required: "This field is required",
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor=""></label>
              <input
                id="surname"
                type="text"
                className="form-control"
                aria-describedby="surnameHelp"
                placeholder="Surname"
                {...register("surname", {
                  required: "This field is required",
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username"></label>
              <input
                id="username"
                type="text"
                className="form-control"
                aria-describedby="usernameHelp"
                placeholder="Username"
                {...register("username", {
                  required: "This field is required",
                })}
              />
            </div>

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
                  required: "This field is required",
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_two"></label>
              <input
                id="password_two"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                {...register("password_two", {
                  required: "This field is required",
                })}
              />
            </div>
            <p></p>
            <button type="register" className="btn btn-success">
              {!isLoading ? "Register" : <Loader />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
