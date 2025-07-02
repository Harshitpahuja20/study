import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import aboutImg from "../../assets/image/png/aboutImg.jpeg";

const HomeAboutSection = () => {
  return (
    <div className="pt-5 ff_p">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              className="w-100 object-fit-cover rounded-3"
              height={400}
              src={aboutImg}
              alt="aboutImg"
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h3 className=" ff_p mb-0 fw-bold">ABOUT JBS INSTITUTE</h3>
            <i className=" fs-5 mb-0 mt-2 fw-medium">
              JBS Institute – Empowering India Through Skills
            </i>
            <p className=" ff_p mt-3">
              JBS Institute of Skill Education is more than just an
              institute—it’s a place where dreams take shape. We believe every
              student is unique, and so are their career goals. That’s why we
              offer a wide range of diploma, certificate, and university courses
              that students can choose based on their interests and passions.
              Whether you want to become a teacher, technician, entrepreneur,
              artist, or IT expert, JBS gives you the freedom to learn what you
              love and grow into who you want to be. With expert mentors,
              practical training, and a flexible approach to education, we are
              here to support every learner’s journey toward success.
            </p>
            <p className=" ff_p mt-3">
              At JBS, we are committed to helping students make the right
              choices for their future. With easy guidance, real-time
              information, and expert counseling, we bridge the gap between
              aspiring learners and quality education—so that every student can
              move forward with confidence.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAboutSection;
