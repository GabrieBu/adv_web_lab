import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ProfileBar({ active_page }) {
  let backgroundColor_home = "green";
  let color_home = "white";
  let backgroundColor_order = "white";
  let color_order = "green";
  let backgroundColor_profile = "white";
  let color_profile = "green";

  if (active_page === "order") {
    backgroundColor_home = "white";
    color_home = "green";
    backgroundColor_order = "green";
    color_order = "white";
  } else if (active_page === "profile") {
    backgroundColor_home = "white";
    color_home = "green";
    backgroundColor_profile = "green";
    color_profile = "white";
  }

  return (
    <ul className="nav nav-pills nav-fill fixed-bottom">
      <li className="nav-item">
        <Link
          id="home"
          to="/home"
          className="nav-link active"
          aria-current="page"
          style={{
            borderRadius: "0px",
            backgroundColor: backgroundColor_home,
            color: color_home,
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faBars} />
            Menu
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          id="order"
          to="/order"
          className="nav-link"
          style={{
            borderRadius: "0px",
            backgroundColor: backgroundColor_order,
            color: color_order,
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faList} />
            Order
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          id="profile"
          to="/profile"
          className="nav-link"
          style={{
            borderRadius: "0px",
            backgroundColor: backgroundColor_profile,
            color: color_profile,
          }}
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

ProfileBar.propTypes = {
  active_page: PropTypes.oneOf(["home", "order", "profile"]).isRequired,
};

export default ProfileBar;
