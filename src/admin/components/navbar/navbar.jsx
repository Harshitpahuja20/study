import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
import {
  FaPhoneAlt,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
// import logo from "../../../src/assets/image/svg/maineLogo.png";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);
  const [show, setShow] = useState(false);

  const toggleOffcanvas = () => setShow((prev) => !prev);

  return (
    <>
      {/* Top Red Bar */}

      {/* Main Navbar */}
      <Navbar
        expand="sm"
        className="  d-flex flex-column align-items-start ff_p  pt-0 pb-0"
      >
        <div className="bg-light p-2 py-3 w-100">
          <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <Link to="/" className="pb-0">
                    <div className="d-flex clr_theme align-items-center gap-2">
                      <h6 className="ff_p  fw-bold mb-0">
                        Admin Panel
                      </h6>
                    </div>
                  </Link>
                  
                  <div className="d-lg-block d-none">
                    <div className="d-flex  align-items-center gap-2 clr_theme small">
                      <FaPhoneAlt />
                      <span className=" fs_14">
                        +91-7357777796 | 9729957434
                      </span>
                    </div>
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
      <Offcanvas show={showSidebar} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* <img src={logo} alt="logo" style={{ maxHeight: "60px" }} /> */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/"
              onClick={toggleOffcanvas}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/about"
              onClick={toggleOffcanvas}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/top-university"
              onClick={toggleOffcanvas}
            >
              Top University
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/top-college"
              onClick={toggleOffcanvas}
            >
              College
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/top-iti"
              onClick={toggleOffcanvas}
            >
              Iti
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/news"
              onClick={toggleOffcanvas}
            >
              News
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/student-verification"
              onClick={toggleOffcanvas}
            >
              Student Verification
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/result"
              onClick={toggleOffcanvas}
            >
              Result
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/contact-us"
              onClick={toggleOffcanvas}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/apply-franchise"
              onClick={toggleOffcanvas}
            >
              Apply Franchise
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/my-account"
              onClick={toggleOffcanvas}
            >
              Franchise Login
            </Nav.Link>
            <Nav.Link
              className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 mt-2"
              as={Link}
              to="/category"
              onClick={toggleOffcanvas}
            >
              Category
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
