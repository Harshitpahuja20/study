import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";

import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMinus,
  FaPlus,
  FaTools,
  FaUserGraduate,
  FaHandshake,
  FaPhoneAlt,
  FaStream,
  FaMapMarkerAlt,
  FaBook,
} from "react-icons/fa";
import logo from "../../../assets/image/svg/maineLogo.png";
import { useStudy } from "../../../context/study.context";
import { MdDeviceHub } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill, BsWallet } from "react-icons/bs";

// ✅ Reusable Dropdown Component
function DropdownMenu({ label, icon, items = [], basePath = "", handleClick }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const isActive = location.pathname.includes(basePath);

  return (
    <div className="w-100 mt-2">
      <div
        onClick={toggle}
        className={`text-dark px-4 py-2 w-100 text-start sidebar-link dropdown-toggle d-flex justify-content-between align-items-center ${
          isActive ? "bg-light" : "bg-white"
        } border rounded`}
        style={{ cursor: "pointer" }}
      >
        <span className="me-3 d-flex align-items-center gap-2">
          {icon} {label}
        </span>
        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
      </div>

      {isOpen && (
        <div className="mt-2 px-3">
          <div className="bg-white rounded shadow-sm overflow-hidden border">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-dark ff_p border-bottom border-2 d-block px-4 py-2 text-decoration-none"
                onClick={handleClick}
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

const AdminNavbar = () => {
  const navigate = useNavigate()
  const { currentUser, handleLogOut , isOther, setIsOther} = useStudy();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state to manage dropdown toggle

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

  // Toggle function for dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOffcanvas = () => setShow((prev) => !prev);

  return (
    <>
      {/* Top Red Bar */}

      {/* Main Navbar */}
      <Navbar
        expand="sm"
        className=" d-flex flex-column align-items-start ff_p  pt-0 pb-0"
      >
        <div className="bg-light w-100">
          <Container fluid className="py-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/" className="pb-0">
                    <div className="d-flex clr_theme align-items-center gap-2">
                      <h6 className="ff_p  fw-bold mb-0">Admin Panel</h6>
                    </div>
                  </Link>

                  <div className="d-lg-block d-none">
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-user"
                        className="d-flex align-items-center gap-2 clr_theme small p-0 border-0 shadow-none"
                      >
                        <span className="mb-0 fs_14 fw-semibold text-end">
                          {currentUser?.franchiseName} <br />{" "}
                          {currentUser?.email}
                        </span>
                        <FaUserCircle size={34} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="">
                        <Dropdown.Item
                          onClick={() => handleLogOut()}
                          className="bg-white text-dark"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Navbar.Brand>
              <Button
                variant="light"
                onClick={handleShow}
                className="d-lg-none ms-auto"
              >
                <span className="navbar-toggler-icon" />
              </Button>
            </div>
          </Container>
        </div>
      </Navbar>

      {/* Mobile Sidebar Navigation */}
      <Offcanvas
        className="Side"
        show={showSidebar}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer py-3 border-0 border-secondary fs-5 fw-bold">
              <img width={50} className=" rounded-5" src={logo} alt="logo" />
              <h6 className="ff_p  fw-bold mb-0">
                JBS INSTITUTE OF <br className=""></br>SKILL EDUCATION
              </h6>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="px-3">
          <div className="border my-3  border-2 w-100"></div>
        </div>
        <Offcanvas.Body className="pt-0">
          <Nav className="flex-column gap-2">
            <div className="flex-grow-1 px-2">
              {!isOther && (
                <>
                  {navItems1.map((item, index) => {
                    return (
                      <React.Fragment key={item.to}>
                        {index === 2 && (
                          <div
                            onClick={() => {
                              setIsOther(true);
                              navigate( "/admin/dashboard/other");
                            }}
                            className="d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-black ff_p sidebar-link rounded small-text"
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
                          className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-black ff_p sidebar-link rounded small-text ${
                            location.pathname === item.to
                              ? "bg-light"
                              : ""
                          }`}
                        >
                          <span className="me-3">{item.icon}</span>
                          {item.label}
                        </Link>
                      </React.Fragment>
                    );
                  })}
                  <DropdownMenu
                    onClick={toggleOffcanvas}
                    label="News"
                    icon={<FaTools />}
                    items={[
                      { to: "/admin/news/add", label: "Add News" },
                      { to: "/admin/news/view", label: "All News" },
                    ]}
                    basePath="/admin/news/add"
                  />
                  <DropdownMenu
                    onClick={toggleOffcanvas}
                    label="Course Section"
                    icon={<FaBook />}
                    items={[
                      { to: "/admin/course/main", label: "Main Courses" },
                      { to: "/admin/course/sub", label: "All Sub Courses" },
                    ]}
                    basePath="/admin/news/add"
                  />
                  <DropdownMenu
                    onClick={toggleOffcanvas}
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
                          className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-black ff_p sidebar-link rounded small-text ${
                            location.pathname === item.to
                              ? "bg-light"
                              : ""
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
                            className="d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-black ff_p sidebar-link rounded small-text"
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
                    onClick={toggleOffcanvas}
                    label="Center"
                    icon={<MdDeviceHub />}
                    items={[
                      { to: "/admin/center/add", label: "Add Center" },
                      { to: "/admin/center/view", label: "All Centers" },
                    ]}
                    basePath="/admin/center/add"
                  />
                  <DropdownMenu
                    onClick={toggleOffcanvas}
                    label="Manage Students"
                    icon={<PiStudent />}
                    items={[
                      { to: "/admin/student/add", label: "Add Student" },
                      { to: "/admin/students/view", label: "All Verified" },
                    ]}
                    basePath="/admin/student/add"
                  />

                  <DropdownMenu
                    onClick={toggleOffcanvas}
                    label="Vocational Courses"
                    icon={<IoBookSharp />}
                    items={[
                      {
                        to: "/admin/vocationalCourse/add",
                        label: "Add Course",
                      },
                      {
                        to: "/admin/vocationalCourse/view",
                        label: "All Course",
                      },
                    ]}
                    basePath="/admin/vocationalCourse/add"
                  />
                  <DropdownMenu
                    onClick={toggleOffcanvas}
                    label="Results"
                    icon={<IoBookSharp />}
                    items={[
                      { to: "/admin/results/issue", label: "Issue Result" },
                      { to: "/admin/results", label: "Delete Result" },
                    ]}
                    basePath="/admin/results/issue"
                  />
                  <DropdownMenu
                    onClick={toggleOffcanvas}
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
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
