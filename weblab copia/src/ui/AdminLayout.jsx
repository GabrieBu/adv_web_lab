//import { useNavigate } from "react-router-dom";
//import { logout } from "../services/db/authentication/apiAuth";
import useTitle from "../hooks/useTitle";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Orders from "../components/Orders";

function AdminLayout() {
  const [tab, setTab] = useState(3);
  //const navigate = useNavigate();
  useTitle("Staff Dashboard");

  /*function userLogout() {
    navigate("/loginadmin");
    logout();
  }*/

  let content;
  if (tab === 0) {
    content = <Orders />;
  } else if (tab === 1) {
    content = <div>Content for 1</div>;
  } else if (tab === 2) {
    content = <div>Content for 2</div>;
  } else {
    content = <div>Content for 3</div>;
  }

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar onSetTab={setTab} tab={tab} />
      <div id="page-content-wrapper">
        <div className="container-fluid">{content}</div>
      </div>
    </div>
  );
  /*return (
    <div>
      <h1>Now you are logged in as an Admin</h1>
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  );*/
}

export default AdminLayout;
