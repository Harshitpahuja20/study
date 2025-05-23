import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { useStudy } from "../../context/study.context";
import { getAbsoluteUrl } from "../../services/common.service";

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

// const universities = [
//   {
//     name: "Maharaja Agrasen Himalayan Garhwal University",
//     location: "Dhaid Gaon - Uttarakhand",
//     approvals: ["UGC", "BCI", "PCI", "AIU"],
//     logo: universityLogo, // Replace with actual URL
//   },
//   {
//     name: "India Education Centre University (IECU)",
//     location: "Solan - Himachal Pradesh",
//     approvals: ["UGC", "PCI", "BCI", "AICTE"],
//     logo: universityLogo, // Replace with actual URL
//   },
//   {
//     name: "Himalayan University (HU)",
//     location: "Papum Pare - Arunachal Pradesh",
//     approvals: ["UGC", "AIU", "IAO", "BCI", "PCI", "RCI"],
//     logo: universityLogo, // Replace with actual URL
//   },
// ];

function getCurrentSession() {
  const now = new Date();
  const year = now.getFullYear();
  const nextYearShort = (year + 1).toString().slice(-2);
  return `${year} - ${nextYearShort}`;
}

const UniversityHeroSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { universities, getInstitutes } = useStudy();
  const { data, loading } = universities;

  useEffect(() => {
    if (loading) {
      getInstitutes("University");
    }
  }, []);

  function csvToArray(csvString) {
    return csvString.split(",").map((item) => item.trim());
  }

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
                Top university in India Admission 2025 - 26, Important Topics,
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
            {!loading && data?.length !== 0 ? (
              data?.map((uni, index) => (
                <div
                  className="uni-card mt-4 d-md-flex align-items-center justify-content-between p-3 mb-3"
                  key={index}
                >
                  <div className="d-sm-flex align-items-center gap-3">
                    <img
                      src={getAbsoluteUrl(uni?.instituteLogo)}
                      alt={uni.instituteName}
                      className="uni-logo"
                    />
                    <div className="mt-3 mt-sm-0">
                      <p className="mb-1 fw-semibold">
                        Admissions Open for All Courses {getCurrentSession()}
                      </p>
                      <h6 className="mb-1 text-primary fw-bold">
                        {uni?.instituteName}
                      </h6>
                      <p className="mb-1 text-muted">
                        <FaMapMarkerAlt className="text-danger me-1" />
                        {`${uni?.city} - ${uni?.state}`}
                      </p>
                      <div className="text-muted align-items-center d-flex flex-wrap gap-2">
                        <FaCheck className="text-success" />
                        {uni?.approvedBy &&
                          csvToArray(uni?.approvedBy).map((tag, i) => (
                            <span
                              key={i}
                              className="d-flex align-items-center gap-1"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-end mt-3 mt-md-0 d-flex flex-column gap-2">
                    <Button
                      variant="danger"
                      className="btn-orange px-4 ff_p fs_14 rounded-0"
                    >
                      Apply Now
                    </Button>
                    <Link to={`/details/University/${uni?._id}`}>
                      <Button
                        variant="primary"
                        className="px-4 ff_p rounded-0 fs_14"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : !loading && data?.length === 0 ? (
              <>
                <i className=" text-danger ff_r fs_12">
                  {" "}
                  "No collages available at the moment. Please check back
                  later."
                </i>
              </>
            ) : (
              ""
            )}
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

export default UniversityHeroSection;
