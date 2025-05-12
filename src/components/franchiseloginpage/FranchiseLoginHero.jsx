import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FranchiseLoginHero = () => {
  return (
    <div className="py-5">
      <Container className="py-4">
        <Row className=" justify-content-center">
          <Col md={5}>
            <div className="card p-4">
              <h4 className=" clr_theme fw-bold mb-0 ff_p">
                Access Your Panel
              </h4>
              <p className=" mb-0 ff_p mt-1">
                Check your all details before submit
              </p>
              <div className="d-flex mt-4 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Email</label>
                <input className="mt-2 py-2 px-3" type="text" />
              </div>
              <div className="d-flex mt-3 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Password</label>
                <input className="mt-2 py-2 px-3" type="password" />
              </div>
              <span
                className="text-primary mb-0 ff_p mt-1"
                style={{ cursor: "pointer" }}
              >
                Forgot password ?
              </span>
              <button className=" bg_theme w-100 py-2 text-white ff_p border-0 mt-4">
                Get Access
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FranchiseLoginHero;
