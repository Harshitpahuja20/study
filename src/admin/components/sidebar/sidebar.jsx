import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaChevronDown,
  FaMinus,
  FaPlus,
  FaTools,
} from "react-icons/fa";
import logo from "../../../assets/image/svg/maineLogo.png";
function Sidebar({ isSidebarOpen }) {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state to manage dropdown toggle

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // Toggle function for dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`bg-dark text-white Side `} id="sidebar">
      <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer py-3 border-bottom border-secondary fs-5 fw-bold">
        <img width={50} className=" rounded-5" src={logo} alt="logo" />
        <h6 className="ff_p  fw-bold mb-0">
          JBS INSTITUTE OF <br className=""></br>SKILL EDUCATION
        </h6>
      </div>
      <div className="flex-grow-1 px-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-white sidebar-link ${
              location.pathname === item.to ? "bg-primary" : "bg-dark"
            }`}
          >
            <span className="me-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        {/* Dropdown Menu */}
        <div className={`w-100 mt-3`}>
          <div
            onClick={toggleDropdown}
            className={`text-white px-4 py-2 w-100  text-start sidebar-link dropdown-toggle ${
              location.pathname.includes("/services")
                ? "bg-primary d-flex justify-content-between align-items-center"
                : "bg-dark d-flex justify-content-between align-items-center"
            }`}
            style={{ cursor: "pointer" }}
          >
            <span className="me-3">
              {" "}
              <span className="me-3">
                <FaTools />
              </span>
              Services
            </span>
            <span>
              {" "}
              {isDropdownOpen ? (
                <FaMinus size={12} />
              ) : (
                <FaPlus size={12} />
              )}{" "}
            </span>
            {/* Plus/Minus Toggle */}
          </div>

          {isDropdownOpen && (
            <div className=" mt-2 px-3">
              <div className="bg-white w-100">
                <Link
                  to="/services/design"
                  className="text-black ff_p border-bottom border-2 d-block px-4 py-2"
                >
                  Design
                </Link>
                <Link
                  to="/services/development"
                  className="text-black ff_p border-bottom border-2 d-block px-4 py-2"
                >
                  Development
                </Link>
                <Link
                  to="/services/marketing"
                  className="text-black ff_p border-bottom border-2 d-block px-4 py-2"
                >
                  Marketing
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
