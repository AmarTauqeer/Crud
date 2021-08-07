import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Menu = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div className="navigation">
      <h5>Menu</h5>
      <div className="menu-icon p-1" onClick={handleClick}>
        {click ? (
          <div>
            <FaTimes size={30} />
            <nav className="navbar">
              <ul className={click ? "navbar-nav active" : "navbar-nav"}>
                <li className="nav-item">
                  <Link to="/" className="nav-link p-1">
                    Home
                  </Link>
                </li>
                {localStorage.getItem("user_name") && (
                  <div>
                    <li className="nav-item">
                      <Link to="/all_department" className="nav-link p-1">
                        Department
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/all_employee" className="nav-link p-1">
                        Employee
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </nav>
          </div>
        ) : (
          <div>
            <FaBars size={30} />
          </div>
        )}
      </div>
      <div className="navigation-rest">
        <nav className="navbar">
          <ul className={click ? "navbar-nav active" : "navbar-nav"}>
            <li className="nav-item">
              <Link to="/" className="nav-link p-1">
                Home
              </Link>
            </li>
            {localStorage.getItem("user_name") && (
              <div>
                <li className="nav-item">
                  <Link to="/all_department" className="nav-link p-1">
                    Department
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/all_employee" className="nav-link p-1">
                    Employee
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
