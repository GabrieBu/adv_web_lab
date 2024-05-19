import { useState } from "react";
import { resetPassword } from "../services/db/authentication/apiAuth";
import Loader from "../loaders/Loader";
import { useAuthUser } from "../hooks/useAuthUser";
import History from "./History";
import { useForm } from "react-hook-form";
import { updateName, updateSurname } from "../services/db/profile/apiProfile";
import toast from "react-hot-toast";

function UserComponent() {
  const { register, handleSubmit } = useForm();
  const { user_auth, user, isLoading } = useAuthUser();
  const [showEdit, setShowEdit] = useState(false);
  const [validation_resetPassword, setValidation_resetPassword] = useState("");

  async function onSubmit(obj) {
    if (obj.name && obj.name !== user_auth.name) {
      await updateName(obj.name, user_auth.id);
      
    }
    if (obj.surname && obj.surname !== user_auth.surname) {
      await updateSurname(obj.surname, user_auth.id);
    }toast.success(" Profile update successfully");
  }

  function handleResetPassword() {
    resetPassword(user.email);
    setValidation_resetPassword("Email sent");
  }

  if (isLoading) return <Loader />;
  return (
    <div className="user-component">
      <button className="edit-button" onClick={() => setShowEdit(!showEdit)}
      style={{ backgroundColor: "#008000", color: "white" ,borderRadius: "10px"}}>
        Edit
      </button>
      <div className="welcome-section">
        <h1>Welcome</h1>
        <h2>
          {user_auth.name} {user_auth.surname}
        </h2>
      </div>{" "}
      <hr />
      <div className="user-info">
        <h3>
          {showEdit && (
            <div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p style={{marginLeft: "20px",}}>Username: {user_auth.username}</p>

                  <label className="user-component" htmlFor="name" >
                    Name:{" "}{" "}
                  </label><br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    style={{borderRadius: "10px",marginLeft: "20px",}}
                    defaultValue={user_auth.name}
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                  <br />

                  <label className="user-component" htmlFor="surname">
                    Surname:{" "}
                  </label><br />
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    style={{borderRadius: "10px",marginLeft: "20px"}}
                    defaultValue={user_auth.surname}
                    {...register("surname", {
                      required: "This field is required",
                    })}
                  />
                  <br />

                  <button
                    className="submit-button"
                    type="submit"
                    value="Submit"
                    style={{ marginLeft: "20px",marginBottom: "10px"}}
            
                  >
                    Update
                  </button>
                </form>
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleResetPassword}
                style={{ backgroundColor: "#008000", color: "white" ,borderRadius: "10px",marginLeft: "20px",marginBottom: "10px"}}
              >
                Reset Password
              </button>
              {validation_resetPassword && (
                <p className="text-success" style={{ marginLeft: "20px",color: "#008000"}}>{validation_resetPassword}</p>
              )}
            </div>
          )}
        </h3>
        <br />
        <h3>
          <h1 className="text-success" style={{ color: "#008000" }}>Earned Points </h1>
          {user_auth.points}
        </h3>
      </div>
      <hr />
      <div className="history">
        <h1 style={{ color: "#008000" }}>Past orders:</h1>
        <History id={user.id} />
      </div>
      <hr />
      <style>{`
        .user-component {
          position: relative;
          font-family: "Arial", sans-serif;
          color: #333;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          margin-top: 1000px;
          margin: auto;
        }

        .edit-button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #198754; /* Bootstrap 'btn-success' color */
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 2px;
        }

        .submit-button {
          padding: 10px 20px;
          font-size: 1rem;
          // background-color: #198754; /* Bootstrap 'btn-success' color */
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px;
          margin-bottom: 20px;
          margin-top: 10px;
          background-color: #008000; 
          color: white ;
          border-radius: 10px ;
          marginLeft: "20px"
        }

        .welcome-section {
          text-align: center; /* Centers the welcome section text */
          margin-top: 25px; /* Adjusts the top margin */
        }

        .welcome-section h1 {
          margin: 0;
          font-size: 2rem; /* Larger text for 'Welcome' */
          color: green;
        }

        .welcome-section h2 {
          margin-top: 0.5rem;
          font-size: 1.5rem; /* Adjusted size for name */
        }

        .user-info {
          margin-top: 25px;
          margin-bottom: 25px;
          // text-align: center;
        }

        .history {
          margin-top: 25px;
        }
      `}</style>
    </div>
  );
}

export default UserComponent;
