import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ProfileBar() {
  return (
    <ul className="nav nav-pills nav-fill fixed-bottom">
      <li className="nav-item">
        <Link
          to="/home"
          className="nav-link active"
          aria-current="page"
          style={{ borderRadius: "0px", backgroundColor: "green"}}
        >
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faBars} />
            Menu
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/order"
          className="nav-link"
          style={{ borderRadius: "0px", backgroundColor: "white", color: "green" }}
        >
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faList} />
            Order
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/profile"
          className="nav-link"
          style={{ borderRadius: "0px", backgroundColor: "white", color: "green"}}
        >
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faUser} />
            Profile
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default ProfileBar;
