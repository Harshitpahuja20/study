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
import logo from "../../../src/assets/image/svg/maineLogo.png";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
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
        expand="lg"
        className="  d-flex flex-column align-items-start ff_p  pt-0"
      >
        <div className="bg-light p-2 w-100">
          <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <Link to="/" className="pb-0">
                    <div className="d-flex clr_theme align-items-center gap-2">
                      <img
                        src={logo}
                        className="minH"
                        alt="logo"
                        style={{ maxHeight: "50px" }}
                      />
                      <h6 className="ff_p  fw-bold mb-0">
                        JBS INSTITUTE OF <br className=""></br>SKILL EDUCATION
                      </h6>
                    </div>
                  </Link>
                  <div className=" d-sm-flex d-none justify-content-center">
                    {/* <div
                      className="input-group border rounded-1"
                      style={{ width: "100%", maxWidth: "400px" }}
                    >
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Search here..."
                        aria-label="Search"
                      />
                      <button
                        className="btn border-0 btn-outline-secondary"
                        type="button"
                      >
                        <BiSearch />
                      </button>
                    </div> */}
                  </div>
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
        <Container className="">
          {/* Desktop Navigation */}
          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-end  w-100 align-items-center py-3 d-none d-lg-flex"
          >
            <Nav className="align-items-center clr_theme ps-0 justify-content-center w-100 gap-3">
              <Nav.Link
                className="  fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/about"
              >
                About Us
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/top-university"
              >
                Top University
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/top-college"
              >
                College
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/top-iti"
              >
                Iti
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/course-category"
              >
                Course Category
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/news"
              >
                News
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/enrollment"
              >
                Student Verification
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/result"
              >
                Result
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/contact-us"
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/apply-franchise"
              >
                Apply Franchise
              </Nav.Link>
              <Nav.Link
                className=" fs_12 ff_p mb-0 pb-0 clr_theme ps-0 "
                as={Link}
                to="/my-account"
              >
                Franchise Login
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Sidebar Navigation */}
      <Offcanvas show={showSidebar} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="logo" style={{ maxHeight: "60px" }} />
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
              to="/course-category"
              onClick={toggleOffcanvas}
            >
              Course Category
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
           
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
