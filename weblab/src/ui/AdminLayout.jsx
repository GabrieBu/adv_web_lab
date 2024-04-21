import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";
import useTitle from "../hooks/useTitle";

function AdminLayout() {
  const navigate = useNavigate();
  useTitle("Staff Dashboard");

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
