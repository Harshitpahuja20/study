import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const StudentHero = () => {
  return (
    <div className="py-5">
      <Container className="py-4">
        <Row className=" justify-content-center">
          <Col md={5}>
            <div className="card p-4">
              <h4 className=" clr_theme fw-bold mb-0 ff_p">
                Student Verification
              </h4>
              <p className=" mb-0 ff_p mt-1">
                Check your all details before submit
              </p>
              <div className="d-flex mt-4 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Enrollment Number</label>
                <input className="mt-2 py-2 px-3" type="number" />
              </div>
              <div className="d-flex mt-3 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Date Of Birth</label>
                <input className="mt-2 py-2 px-3" type="date" />
              </div>
              <button className=" bg_theme w-100 py-2 text-white ff_p border-0 mt-4">
                Verify
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentHero;
