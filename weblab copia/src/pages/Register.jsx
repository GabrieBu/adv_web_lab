import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { validateEmail } from "../services/db/validation";
import Loader from "../loaders/Loader";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
  const [errorMessages_Email, setErrorMessages_Email] = useState("");
  const [errorMessages_Passwords, setErrorMessages_Passwords] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function onSubmit(auth) {
    setErrorMessages_Email("");
    setErrorMessages_Passwords("");
    setSuccessMessage("");

    if (!validateEmail(auth.email)) {
      setErrorMessages_Email("Email is not valid!");
    }
    else {
      setErrorMessages_Email("");
    }

    if (!isStrongPassword(auth.password)) {
      setErrorMessages_Passwords(
        "Please enter a stronger password. Include numbers, special characters, and both uppercase and lowercase letters."
      );
    }

    if (auth.password !== auth.password_two) {
      setErrorMessages_Passwords("The passwords do not match.");
    }

    register_api(auth); //create record in OAuth supabase and corresponding record in user table (same user id)
    if (register_api(auth)) {
      setSuccessMessage("Successfully registered!");
    }

  }

  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10">
          <p></p>
          <Link to="/login">
            <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ position: "absolute", top: 10, left: 10, cursor: "pointer" }} />
          </Link>
          <h2 className="text-success">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
            <p></p>

            <div className="form-group">
              <label htmlFor="">Surname</label>
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
            <p></p>

            <div className="form-group">
              <label htmlFor="username">Username</label>
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
            <p></p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
            {errorMessages_Email && <p className="text-danger">{errorMessages_Email}</p>}
            <p></p>

            <div className="form-group">
              <label htmlFor="password">Password</label>
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

            <div className="form-group">
              <label htmlFor="password_two">Confirm Password</label>
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
            {errorMessages_Passwords && <p className="text-danger">{errorMessages_Passwords}</p>}
            <p></p>
            <button type="register" className="btn btn-success">
              {!isLoading ? "Register" : <Loader />}
            </button>
            {successMessage && <p className="text-success">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
