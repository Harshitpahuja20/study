import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import aboutImg from "../../assets/image/png/ok.jpg"; // Replace with director's image

const DirectorSection = () => {
  return (
    <div className="py-5 ff_p bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              className="w-100 rounded-3 shadow-sm"
              style={{ objectFit: "cover",maxWidth: "300px", maxHeight: "350px" }}
              src={aboutImg}
              alt="Director Dalip Kumar"
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h3 className="ff_p mb-2 fw-bold text-uppercase">
              Meet Our Director
            </h3>
            <h5 className="text-primary fw-semibold mb-3">Mr. Dalip Kumar</h5>
            <p className="ff_p" style={{lineHeight : 1.6}}>
              Mr. Dalip Kumar, the visionary founder and director of JBS Institute of Skill Education, believes that education should empower individuals to shape their future. With years of dedication to educational reform and skill development, he has created a learning environment where passion meets purpose.
            </p>
            <p className="ff_p" style={{lineHeight : 1.6}}>
              Under his leadership, JBS Institute has become a trusted destination for students across India seeking practical, career-focused education. His mission is to make learning accessible, flexible, and aligned with real-world industry needs—ensuring that every student is prepared not just for a job, but for a meaningful career.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DirectorSection;
