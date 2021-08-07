import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import amar from "../../images/amar.PNG";

const Header = () => {
  const history = useHistory();
  const [username, SetUserName] = useState("");

  useEffect(() => {
    let uname = localStorage.getItem("user_name");
    let upass = localStorage.getItem("user_password");
    if (uname && upass) {
      SetUserName(uname);
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem("user_name", "");
    localStorage.setItem("user_password", "");
    window.location.reload();
    history.push({
      pathname: "/login",
    });
  };
  return (
    <div className="header">
      <div className="row">
        <div className="col-md-7">
          <h2>Django, React, MongoDB Crud Application</h2>
        </div>
        <div className="col-md-5 mt-2">
          {username ? (
            <div className="row p-1" style={{ textAlign: "right" }}>
              <div className="dropdown show">
                <span className="welcome-message" style={{ padding: "5px" }}>
                  Welcome {username}
                </span>
                <a
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={amar} width="25px" height="25px" alt="avtar" />
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link to="" className="dropdown-item">
                    Change Password
                  </Link>
                  <Link to="" onClick={handleClick} className="dropdown-item">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="row" style={{ textAlign: "right" }}>
              <Link to="/signup" className="nav-link col-md-10">
                Signup
              </Link>
              <Link to="/login" className="nav-link col">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
