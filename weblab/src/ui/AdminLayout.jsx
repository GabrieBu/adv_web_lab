import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";

function AdminLayout() {
  const navigate = useNavigate();

  function userLogout() {
    navigate("/loginadmin");
    logout();
  }

  return (
    <div>
      <h1>Now you are logged in as an Admin</h1>
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  );
}

export default AdminLayout;
