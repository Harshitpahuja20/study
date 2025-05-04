import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ContactUsHero = () => {
  return (
    <div className="py-5 ff_p">
      <Container className="py-md-4">
        <Row className=" align-items-center">
          <Col className="pe-md-5" md={6}>
            <h4 className="fw-bold mb-0 ">Feel Free To Contact Us</h4>
            <p className=" mb-0 mt-1">
              We are experienced in handling the formalities and
              documentationrequired for your imports and exports. We work with
              all international station to guarantee that your load will safely
              reach without any delays.
            </p>
            <div className="mt-4">
              <h6 className="fw-bold mb-0 ">Postal Address :</h6>
              <p className=" mb-0 mt-1">Hisar Haryana India, 125001</p>
            </div>
            <div className="border w-100 my-4"></div>
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Phone :</h6>
                <p className=" mb-0 mt-1">+91 94668-20098</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Email :</h6>
                <p className=" mb-0 mt-1">shiskhasangamindia@gmail.com</p>
              </Col>
            </Row>
            <div className="border w-100 my-4"></div>
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Website :</h6>
                <p className=" mb-0 mt-1">https://www.shikshasangam.in</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Website :</h6>
                <p className=" mb-0 mt-1">
                  Facebook / Instagram - shikshasangamindia
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <Row>
              <Col className="mt-4" md={6}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="text"
                  placeholder="Full Name"
                />
              </Col>
              <Col className="mt-4" md={6}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="number"
                  placeholder="Enter Your Phone Number"
                />
              </Col>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="email"
                  placeholder="Enter Your Email"
                />
              </Col>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="text"
                  placeholder="Subject"
                />
              </Col>
              <Col className="mt-4" md={12}>
                <textarea
                  name="comment"
                  id="w3review"
                  rows="4"
                  placeholder="Enter Your Comment"
                  className="py-3 px-4 customInput rounded-2 w-100"
                ></textarea>
              </Col>
            </Row>
            <div className="d-flex justify-content-start">
              <button className=" rounded-2 bg_theme w-100 py-3 text-white ff_p border-0 mt-4">
                Send Message
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUsHero;
