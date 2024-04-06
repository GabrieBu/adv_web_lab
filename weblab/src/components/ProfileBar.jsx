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
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="#"></a>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <a className="nav-link active" aria-current="page" href="#">Home</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Profile</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Settings</a>
    //         </li>
    //         <li className="nav-item">
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default ProfileBar;
