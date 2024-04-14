import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import Loader from "../loaders/Loader";

function Register() {
  const { register, handleSubmit } = useForm();
  const { register_api, isLoading } = useRegister();

  function onSubmit(auth) {
    if (!auth.email || !auth.password) return;
    register_api(auth); //create record in OAuth supabase
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
                placeholder="surname"
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
                placeholder="username"
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
