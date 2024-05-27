//import { useNavigate } from "react-router-dom";
//import { logout } from "../services/db/authentication/apiAuth";
import useTitle from "../hooks/useTitle";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Orders from "../components/Orders";
import AdminTables from "../components/AdminTables";
import Manage from "../components/Manage";
import Payment from "../components/Payment";
import Charts from "../components/Charts";
function AdminLayout() {
  const [tab, setTab] = useState(4);
  useTitle("Staff Dashboard");

  let content;
  if (tab === 0) {
    content = <Orders />;
  } else if (tab === 1) {
    content = <Payment />;
  } else if (tab === 2) {
    content = <Manage />;
  } else if (tab === 3) {
    content = <Charts />;
  } else {
    content = <AdminTables />;
  }

  return (
    <div className="d-flex" id="wrapper" style={{ width: "100%" }}>
      <Sidebar onSetTab={setTab} tab={tab} />
      <div id="page-content-wrapper" style={{ width: "100%" }}>
        <div className="container-fluid" style={{ width: "100%" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
