import { useForm } from "react-hook-form";
import { useUpdate } from "../hooks/useUpdate";
import Loader from "../loaders/Loader";

function UpdatePassword() {
  const { handleSubmit, register } = useForm();
  const { update, isLoading } = useUpdate();

  function onSubmit(obj) {
    update(obj);
    alert("Password updated successfully");
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
              <label htmlFor="password"></label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Please confirm your password"
                {...register("password", {
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



