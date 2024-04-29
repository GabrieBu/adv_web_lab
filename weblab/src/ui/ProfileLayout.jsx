import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";
import ProfileBar from "../components/ProfileBar";
import UserComponent from "../components/UserComponent";
import useTitle from "../hooks/useTitle";

function ProfileLayout() {
  const navigate = useNavigate();
  useTitle("Profile - Page");
  function userLogout() {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <ProfileBar />
      <UserComponent />
      <button
        className="logout-button"
        onClick={() => userLogout()}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,.2)",
          zIndex: 1000,
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileLayout;
