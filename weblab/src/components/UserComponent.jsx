// import Loader from "../loaders/Loader";

// import { useAuthUser } from "../hooks/useAuthUser";
// import History from "./History";

// function UserComponent() {
//   const { user_auth, user, isLoading } = useAuthUser();

//   if (isLoading) return <Loader />;
//   return (
//     <div>
//       <h1>
//         Welcome {user_auth.name} {user_auth.surname}
//       </h1>
//       <h3>
//         <b>Username: {user_auth.username}</b>
//       </h3>
//       <h2>You have already earned {user_auth.points} points</h2>
//       {/* <h3>
//         Huakang maybe show the email just if the user clcik something like
//         personal info
//         <p></p>
//         {user.email}
//       </h3> */}
//       <h1>Past orders</h1>
//       <History user_id={user.id} />
//     </div>
//   );
// }

// export default UserComponent;

import React from "react";
import Loader from "../loaders/Loader";
import { useAuthUser } from "../hooks/useAuthUser";
import History from "./History";

function UserComponent() {
  const { user_auth, user, isLoading } = useAuthUser();

  if (isLoading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  return (
    <div className="user-component">
      <button className="edit-button">Edit</button>
      <div className="welcome-section">
        <h1>Welcome</h1>
        <h2>
          {user_auth.name} {user_auth.surname}
        </h2>
      </div>{" "}
      <hr />
      <div className="user-info">
        <h3>
          <b>Username:{user_auth.username}</b>
        </h3>
        <br />
        <h3>
          <b>Earned Points:{user_auth.points}</b>
        </h3>
      </div>
      <hr />
      <div className="history">
        <h1>Past orders:</h1>
        <History user_id={user.id} />
      </div>
      <hr />
      <style jsx>{`
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
