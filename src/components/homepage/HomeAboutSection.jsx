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
            <h3 className=" ff_p mb-0 fw-bold">ABOUT SHIKSHA SANGAM</h3>
            <i className=" fs-5 mb-0 mt-2 fw-medium">
              Shiksha Sangam: Your Ultimate Guide to Higher Education in India
            </i>
            <p className=" ff_p mt-3">
              Shiksha Sangam is your one-stop destination for students
              discovering undergraduate (UG), postgraduate (PG), and Physician
              of Philosophy (Ph.D.) programs throughout India. Shiksha Sangam
              has actually become a trusted platform for aspiring students. With
              a large database that consists of over 60,000+ institutions,
              375,000+ programs, and a registered pupil neighborhood going
              beyond 10 million records, Shiksha Sangam stands as a trustworthy
              and authentic source of educational information.
            </p>
            <p className=" ff_p mt-3">
              Shiksha Sangam is committed to aiding students make notified
              choices concerning their future. With straightforward tools and
              legitimate data, our goal is to connect the gap in between schools
              and aspiring students, guaranteeing that every student locates the
              best scholastic fit.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAboutSection;
