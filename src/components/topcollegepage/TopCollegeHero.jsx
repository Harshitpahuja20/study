import React, { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaCheck, FaFilter } from "react-icons/fa";
import universityLogo from "../../assets/image/png/universityLogo.jpg";

const streams = [
  "Computer Science",
  "Engineering",
  "Commerce",
  "Science",
  "Arts & Social Science",
  "Agriculture & Horticulture",
  "Journalism & Mass Communication",
  "Library Science",
  "Paramedical & Allied Science",
  "Fire & Industrial Safety",
  "Environmental Sciences",
  "Hotel Management",
  "Law",
  "Pharmaceutical science",
  "Business Administration",
  "Education",
  "Design",
  "Philosophy",
];

const states = [
  "Uttarakhand",
  "Himachal Pradesh",
  "Arunachal Pradesh",
  "Gujarat",
  "Chhattisgarh",
  "Rajasthan",
  "Haryana",
  "Punjab",
  "India",
  "Uttar Pradesh",
  "Jharkhand",
  "Sikkim",
  "Manipur",
  "Delhi",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Tamil Nadu",
];

const TopCollegeHero = () => {
  const [showFilters, setShowFilters] = useState(false);

  const FiltersContent = () => (
    <Accordion defaultActiveKey="0" alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Stream</Accordion.Header>
        <Accordion.Body className="pt-1 h-100">
          {streams.map((stream, index) => (
            <div className="form-check mt-3" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`stream-${index}`}
              />
              <label className="form-check-label" htmlFor={`stream-${index}`}>
                {stream}
              </label>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>State</Accordion.Header>
        <Accordion.Body className="pt-1">
          {states.map((state, index) => (
            <div className="form-check mt-3" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`state-${index}`}
              />
              <label className="form-check-label" htmlFor={`state-${index}`}>
                {state}
              </label>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
  return (
    <div className="py-5 ff_p">
      <Container>
        <Row>
          <Col md={4} className="d-none d-md-block">
            <FiltersContent />
          </Col>
          <Col md={8}>
            <div className="d-flex mb-3 align-items-center gap-2">
              <h5 className="ff_r fw-bold mb-0">
                Top college in India Admission 2025 - 26, Important Topics,
                Course & Fees Details
              </h5>
              <div className="d-md-none text-end ">
                <Button
                  variant="outline-primary"
                  onClick={() => setShowFilters(true)}
                >
                  <FaFilter className="me-1" /> Filter
                </Button>
              </div>
            </div>
            <i className=" text-danger ff_r fs_12">
              {" "}
              "No institutes available at the moment. Please check back later."
            </i>
          </Col>
        </Row>
      </Container>
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FiltersContent />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TopCollegeHero;
