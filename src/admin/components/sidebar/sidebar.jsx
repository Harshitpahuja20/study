import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaBookReader,
  FaBook,
} from "react-icons/fa";
import logo from "../../../assets/image/svg/maineLogo.png";
import { MdDeviceHub } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillFileEarmarkSpreadsheetFill,
  BsWallet,
  BsWallet2,
} from "react-icons/bs";
import { useStudy } from "../../../context/study.context";

// ✅ Reusable Dropdown Component
function DropdownMenu({ label, icon, items = [], basePath = "" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const isActive = location.pathname.includes(basePath);

  return (
    <div className="w-100 mt-2 ">
      <div
        onClick={toggle}
        className={`text-white px-3 py-2 w-100 text-start sidebar-link dropdown-toggle d-flex justify-content-between align-items-center small-text ${
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
          <div className="bg-white rounded shadow-sm overflow-hidden small-text">
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
  const navigate = useNavigate();
  const location = useLocation();
  const { isOther, setIsOther } = useStudy();

  const navItems1 = [
    { to: "/", label: "Visit Website", icon: <AiOutlineGlobal /> },
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
    {
      to: "/admin/contactQuerys",
      label: "Contact Queries",
      icon: <FaPhoneAlt />,
    },
    {
      to: "/admin/studentRequests",
      label: "Student Requests",
      icon: <FaUserGraduate />,
    },
    {
      to: "/admin/franchiseRequests",
      label: "Center Requests",
      icon: <FaHandshake />,
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
  const navItems2 = [
    { to: "/", label: "Visit Website", icon: <AiOutlineGlobal /> },
    { to: "/admin/dashboard/other", label: "Home", icon: <FaHome /> },
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

      <div className="flex-grow-1 px-2 nav-scroll">
        {!isOther && (
          <>
            {navItems1.map((item, index) => {
              return (
                <React.Fragment key={item.to}>
                  {index === 2 && (
                    <div
                      onClick={() => {
                        setIsOther(true);
                        navigate("/admin/dashboard/other");
                      }}
                      className="d-flex rounded align-items-center px-3 py-2 mt-2 text-decoration-none text-white sidebar-link small-text bg-dark"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="me-3">
                        <BsFillArrowRightSquareFill />
                      </span>
                      Other Panel
                    </div>
                  )}

                  <Link
                    to={item.to}
                    className={`d-flex rounded align-items-center px-3 py-2 mt-2 text-decoration-none text-white sidebar-link small-text ${
                      location.pathname === item.to ? "bg-secondary" : "bg-dark"
                    }`}
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </React.Fragment>
              );
            })}
            <DropdownMenu
              label="News"
              icon={<FaTools />}
              items={[
                { to: "/admin/news/add", label: "Add News" },
                { to: "/admin/news/view", label: "All News" },
              ]}
              basePath="/admin/news/add"
            />
            <DropdownMenu
              label="Course Section"
              icon={<FaBook />}
              items={[
                { to: "/admin/course/main", label: "Main Courses" },
                { to: "/admin/course/sub", label: "All Sub Courses" },
              ]}
              basePath="/admin/news/add"
            />
            <DropdownMenu
              label="University/ITI"
              icon={<FaTools />}
              items={[
                { to: "/admin/university/add", label: "Add" },
                { to: "/admin/university/view", label: "All University" },
                { to: "/admin/college/view", label: "All colleges" },
                { to: "/admin/iti/view", label: "All ITI" },
              ]}
              basePath="/admin/news/add"
            />
          </>
        )}
        {isOther && (
          <>
            {navItems2.map((item, index) => {
              return (
                <React.Fragment key={item.to}>
                  <Link
                    to={item.to}
                    className={`d-flex rounded align-items-center px-3 py-2 mt-2 text-decoration-none text-white sidebar-link small-text ${
                      location.pathname === item.to ? "bg-secondary" : "bg-dark"
                    }`}
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.label}
                  </Link>
                  {index === 1 && (
                    <div
                      onClick={() => {
                        setIsOther(false);
                        navigate("/admin/dashboard");
                      }}
                      className="d-flex rounded align-items-center px-3 py-2 mt-2 text-decoration-none text-white sidebar-link small-text bg-dark"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="me-3">
                        <BsFillArrowLeftSquareFill />
                      </span>
                      Main Dashboard
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <DropdownMenu
              label="Center"
              icon={<MdDeviceHub />}
              items={[
                { to: "/admin/center/add", label: "Add Center" },
                { to: "/admin/center/view", label: "All Centers" },
              ]}
              basePath="/admin/center/add"
            />
            <DropdownMenu
              label="Manage Students"
              icon={<PiStudent />}
              items={[
                { to: "/admin/student/add", label: "Add Student" },
                { to: "/admin/students/view", label: "All Verified" },
              ]}
              basePath="/admin/student/add"
            />

            <DropdownMenu
              label="Vocational Courses"
              icon={<IoBookSharp />}
              items={[
                { to: "/admin/vocationalCourse/add", label: "Add Course" },
                { to: "/admin/vocationalCourse/view", label: "All Course" },
              ]}
              basePath="/admin/vocationalCourse/add"
            />
            <DropdownMenu
              label="Results"
              icon={<IoBookSharp />}
              items={[
                { to: "/admin/results/issue", label: "Issue Result" },
                { to: "/admin/results", label: "Delete Result" },
              ]}
              basePath="/admin/results/issue"
            />
            <DropdownMenu
              label="Wallet"
              icon={<BsWallet />}
              items={[
                { to: "/admin/wallet", label: "Wallet" },
                { to: "/admin/wallet/topup", label: "Top Up" },
                {
                  to: "/admin/wallet/transactions",
                  label: "Top Up Requests",
                },
              ]}
              basePath="/franchise/vocationalCourse/add"
            />
          </>
        )}

        {/* ✅ Reusable Dropdown */}
      </div>
    </div>
  );
}

export default Sidebar;
