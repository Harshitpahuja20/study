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
import { Link, useLocation } from "react-router-dom";
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
  const { currentUser, handleLogOut } = useStudy();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state to manage dropdown toggle

  const navItems = [
    { to: "/franchise/dashboard", label: "Dashboard", icon: <FaHome /> },
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
        className="  d-flex flex-column align-items-start ff_p  pt-0 pb-0"
      >
        <div className="bg-light w-100">
          <Container fluid className="py-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/" className="pb-0">
                    <div className="d-flex clr_theme align-items-center gap-2">
                      <h6 className="ff_p  fw-bold mb-0">Franchise Panel</h6>
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
                          {currentUser?.fullName} <br /> {currentUser?.email}
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
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-black ff_p sidebar-link rounded ${
                    location.pathname === item.to ? "bg-light" : ""
                  }`}
                >
                  <span className="me-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {/* ✅ Reusable Dropdown */}
              <DropdownMenu
                label="Students"
                icon={<FaUserGraduate />}
                items={[
                  { to: "/franchise/students/add", label: "Add" },
                  { to: "/franchise/students/view", label: "List" },
                ]}
                basePath="/franchise/students/add"
                handleClick={toggleOffcanvas}
              />
              <DropdownMenu
                label="Vocational Courses"
                icon={<IoBookSharp />}
                items={[
                  { to: "/franchise/vocationalCourse/add", label: "Add" },
                  { to: "/franchise/vocationalCourse/view", label: "List" },
                ]}
                basePath="/franchise/vocationalCourse/add"
                handleClick={toggleOffcanvas}
              />
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
