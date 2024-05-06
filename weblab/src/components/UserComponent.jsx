import { useState } from "react";
import { resetPassword } from "../services/db/authentication/apiAuth";
import Loader from "../loaders/Loader";
import { useAuthUser } from "../hooks/useAuthUser";
import History from "./History";

function UserComponent() {
  const { user_auth, user, isLoading } = useAuthUser();
  const [showEdit, setShowEdit] = useState(false);
  const [validation_resetPassword, setValidation_resetPassword] = useState("");

  function handleResetPassword() {
    resetPassword(user.email);
    setValidation_resetPassword("Email sent");
  }

  if (isLoading) return <Loader />;
  return (
    <div className="user-component">
      <button className="edit-button" onClick={() => setShowEdit(!showEdit)}>
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
          <p>
            <b>Username </b>
            {user_auth.username}
          </p>
          {showEdit && (
            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
              {validation_resetPassword && (
                <p className="text-success">{validation_resetPassword}</p>
              )}
            </div>
          )}
        </h3>
        <br />
        <h3>
          <b className="text-success">Earned Points </b>
          {user_auth.points}
        </h3>
      </div>
      <hr />
      <div className="history">
        <h1>Past orders:</h1>
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
          background-color: #5cb85c; /* Bootstrap 'btn-success' color */
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 2px;
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
