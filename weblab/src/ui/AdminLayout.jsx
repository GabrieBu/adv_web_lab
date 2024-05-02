//import { useNavigate } from "react-router-dom";
//import { logout } from "../services/db/authentication/apiAuth";
import useTitle from "../hooks/useTitle";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Orders from "../components/Orders";
import AdminTables from "../components/AdminTables";
import Payment from "../components/Payment";

function AdminLayout() {
  const [tab, setTab] = useState(4);
  useTitle("Staff Dashboard");

  let content;
  if (tab === 0) {
    content = <Orders />;
  } else if (tab === 1) {
    content = <Payment />;
  } else if (tab === 2) {
    content = <p>Manage</p>;
  } else if (tab === 3) {
    content = <p>charts</p>;
  } else {
    content = <AdminTables />;
  }

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar onSetTab={setTab} tab={tab} />
      <div id="page-content-wrapper">
        <div className="container-fluid">{content}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
