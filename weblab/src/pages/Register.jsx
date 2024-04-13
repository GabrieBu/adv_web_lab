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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          {...register("surname", {
            required: "This field is required",
          })}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: "This field is required",
          })}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "This field is required",
          })}
        />
        <label htmlFor="name">Password</label>
        <input
          id="name"
          type="text"
          {...register("password", {
            required: "This field is required",
          })}
        />
        <button type="submit">{!isLoading ? "Register" : <Loader />}</button>
      </form>
    </div>
  );
}

export default Register;
