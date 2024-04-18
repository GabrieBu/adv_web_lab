import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";

function ProfileLayout() {
  const navigate = useNavigate();

  function userLogout() {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <h1>Now you are logged in as a user</h1>
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  );
}

export default ProfileLayout;
