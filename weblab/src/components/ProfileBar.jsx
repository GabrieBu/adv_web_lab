import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList, faUser } from "@fortawesome/free-solid-svg-icons";

function ProfileBar() {
  return (
    <ul className="nav nav-pills nav-fill fixed-bottom">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faBars} />
            Menu
          </div>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faList} />
            History
          </div>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faUser} />
            Profile
          </div>
        </a>
      </li>
    </ul>
  );
}

export default ProfileBar;
