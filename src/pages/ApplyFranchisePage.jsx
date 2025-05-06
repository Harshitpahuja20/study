import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const ApplyFranchisePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div className="py-md-5 py-4 min-vh-100 bg_theme ">
      <Container>
        <Row className=" justify-content-between">
          <Col md={5}>
            <h4 className=" text-white ff_r mb-0">
              Register Franchise & Get It
            </h4>
            <p className="mt-md-4 mt-3 fw-normal text-white ff_r mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              tempora autem quod ducimus nam, nemo vero. Rem, eius. Quidem qui
              tenetur expedita excepturi, accusamus quaerat!
            </p>
          </Col>
          <Col md={6} className="mt-5 mt-md-0">
            <p className="mb-0 ff_r text-white">Create Free account to get</p>
            <h4 className="mb-0 ff_r text-white mt-2">
              Apply For Business Partner
            </h4>
            <div className="div">
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Institute Name*"
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Director Name*"
              />
              <input
                type="number"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Mobile No*"
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Email*"
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="State*"
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="City*"
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Your Address*"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplyFranchisePage;
