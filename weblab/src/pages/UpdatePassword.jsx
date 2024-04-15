import { useForm } from "react-hook-form";
import { useUpdate } from "../hooks/useUpdate";
import Loader from "../loaders/Loader";
import { validateEmail } from "../services/db/validation";

function UpdatePassword() {
  const { handleSubmit, register } = useForm();
  const { update, isLoading } = useUpdate();

  function onSubmit(obj) {
    const { password, confirmPassword, email } = obj;
    if (!validateEmail(email)) {
      alert("Email not valid!");
      return;
    }
    if (!password || !confirmPassword || !email) {
      alert("Some fields are missing! Pleasy try again");
    }
    if (password === confirmPassword) {
      update(obj);
      alert("Password updated successfully");
    } else {
      alert("The passwords do not match. Please try again.");
    }
  }

  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10">
          <p></p>
          <h2 className="text-success">Password Reset</h2>
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
                  required: "This field is required",
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"></label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "This field is required",
                })}
              />
            </div>

            <p></p>
            <button type="submit" className="btn btn-success">
              {!isLoading ? "Submit" : <Loader />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
