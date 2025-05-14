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
  FaUserGraduate,
  FaHandshake,
  FaPhoneAlt,
  FaStream,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../assets/image/svg/maineLogo.png";

// ✅ Reusable Dropdown Component
function DropdownMenu({ label, icon, items = [], basePath = "" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const isActive = location.pathname.includes(basePath);

  return (
    <div className="w-100 mt-2">
      <div
        onClick={toggle}
        className={`text-white px-4 py-2 w-100 text-start sidebar-link dropdown-toggle d-flex justify-content-between align-items-center ${
          isActive ? "" : "bg-dark"
        }`}
        style={{ cursor: "pointer" }}
      >
        <span className="me-3 d-flex align-items-center gap-2">
          {icon} {label}
        </span>
        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
      </div>

      {isOpen && (
        <div className="mt-2 px-3">
          <div className="bg-white rounded shadow-sm overflow-hidden">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-black ff_p border-bottom border-2 d-block px-4 py-2 text-decoration-none"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Main Sidebar Component
function Sidebar({ isSidebarOpen }) {
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
    {
      to: "/admin/studentRequests",
      label: "Student Requests",
      icon: <FaUserGraduate />,
    },
    {
      to: "/admin/franchiseRequests",
      label: "Franchise Requests",
      icon: <FaHandshake />,
    },
    {
      to: "/admin/contactQuerys",
      label: "Contact Queries",
      icon: <FaPhoneAlt />,
    },
    {
      to: "/admin/Streams",
      label: "Streams",
      icon: <FaStream />,
    },
    {
      to: "/admin/Places",
      label: "Places",
      icon: <FaMapMarkerAlt />,
    },
  ];
  
  return (
    <div className={`bg-dark text-white Side`} id="sidebar">
      <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer py-3 border-bottom border-secondary fs-5 fw-bold">
        <img width={50} className="rounded-5" src={logo} alt="logo" />
        <h6 className="ff_p fw-bold mb-0 text-center">
          JBS INSTITUTE OF <br />
          SKILL EDUCATION
        </h6>
      </div>

      <div className="flex-grow-1 px-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`d-flex rounded align-items-center px-4 py-2 mt-2 text-decoration-none text-white sidebar-link ${
              location.pathname === item.to ? "bg-secondary" : "bg-dark"
            }`}
          >
            <span className="me-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        {/* ✅ Reusable Dropdown */}
        <DropdownMenu
          label="News"
          icon={<FaTools />}
          items={[
            { to: "/admin/news/add", label: "Add" },
            { to: "/admin/news/view", label: "List" },
          ]}
          basePath="/news/add"
        />
        <DropdownMenu
          label="Franchise"
          icon={<FaTools />}
          items={[
            { to: "/admin/franchise/add", label: "Add" },
            { to: "/admin/franchise/view", label: "List" },
          ]}
          basePath="/news/add"
        />
      </div>
    </div>
  );
}

export default Sidebar;
