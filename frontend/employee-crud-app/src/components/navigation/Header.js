import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

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
        <div className="col-md-8">
          <h2>Django, React, MongoDB Crud Application</h2>
        </div>
        <div className="col-md-4" style={{ textAlign: "right" }}>
          <div className="row">
            {username ? (
              <div>
                <div className="col-md-12">
                  Welcome {username}
                  <Link to="" onClick={handleClick} className="nav-link">
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div div className="col-md-12">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
