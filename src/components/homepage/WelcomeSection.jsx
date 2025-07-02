import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaRegClock,
  FaUniversity,
  FaChalkboardTeacher,
  FaNetworkWired,
} from "react-icons/fa"; // Import icons

const WelcomeSection = () => {
  return (
    <div className="py-5 ">
      <Container>
        <h3 className=" ff_p mb-0 ">
          JBS Institute Of Skill Education <strong>Advantages</strong>
        </h3>
        <Row className="mt-3">
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100"
              style={{ backgroundColor: "#FEF5DF" }}
            >
              <FaRegClock size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                Wide Range of Courses
              </h6>
              <p className=" ff_p mb-0 mt-2">
                At JBS Institute, students can choose from diploma, certificate, vocational, and university-level programs—all in one place. Whether it's teaching, computers, health, fashion, or business, we offer the course that matches your passion.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#E9F4FC" }}
            >
              <FaUniversity size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                Learn What You Love
              </h6>
              <p className=" ff_p mb-0 mt-2">
                We believe education should be flexible. That’s why students can tell us what course they want, and we make it available. From skill training to full degree programs, JBS supports customized learning for every student.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#FEF5DF" }}
            >
              <FaChalkboardTeacher size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                Expert Faculty & Practical Training
              </h6>
              <p className=" ff_p mb-0 mt-2">
                Our teachers are not only qualified but also experienced in real-life skills. We focus on hands-on training, so students don’t just learn theory—they gain the confidence to succeed in jobs or self-employment.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#F5FFD9" }}
            >
              <FaNetworkWired size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">Recognized & Trusted Education</h6>
              <p className=" ff_p mb-0 mt-2">
                All our university courses and many diplomas are affiliated with recognized boards and universities, ensuring that your education is valid, trusted, and useful for jobs, further studies, or competitive exams.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeSection;
