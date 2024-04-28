import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";
import ProfileBar from "../components/ProfileBar";
import UserComponent from "../components/UserComponent";

function ProfileLayout() {
  const navigate = useNavigate();
  function userLogout() {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <ProfileBar />
      <UserComponent />
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  );
}

export default ProfileLayout;
