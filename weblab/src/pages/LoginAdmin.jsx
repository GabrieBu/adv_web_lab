import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import Loader from "../loaders/Loader";
import useTitle from "../hooks/useTitle";

function LoginAdmin() {
  useTitle("Login Staff");
  const { register, handleSubmit } = useForm();
  const { login, isLoading } = useLogin();

  function onSubmit(info) {
    login(info);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "50px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333" }}>Staff Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                marginBottom: "5px",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
              {...register("email", {
                required: "This field is required",
              })}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                marginBottom: "5px",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
              {...register("password", {
                required: "This field is required",
              })}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {!isLoading ? "Login" : <Loader />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
