import { useForm } from "react-hook-form";
import { useUpdate } from "../hooks/useUpdate";
import Loader from "../loaders/Loader";

function UpdatePassword() {
  const { handleSubmit, register } = useForm();
  const { update, isLoading } = useUpdate();

  function onSubmit(obj) {
    update(obj);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Password"
          {...register("password", {
            required: "This field is required",
          })}
        />
        <button type="submit">
          {isLoading ? "Reset password" : <Loader />}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
