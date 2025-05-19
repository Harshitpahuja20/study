import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Col, Container, Row } from "react-bootstrap";
import helpline from "../assets/image/png/helpline.png";

const DetailsPage = () => {
  return (
    <div>
      <CustomNavbar />
      <div className=" noticeboard-section">
        <Container className="pb-5 pt-2">
          <Row>
            <Col className="mt-4 pe-0 pe-md-5" md={8}>
              <h4 className=" ff_p fw-bold fs_18 mb-0">
                India Education Center University (IECU)-
              </h4>
              <p className=" ff_p mt-3">
                India Education Center (IEC) is a private educational university
                situated in Solan, Himachal Pradesh, India. The University was
                founded on May 11, 2012 to deliver a wide spectrum of
                undergraduate and postgraduate and doctoral studies throughout
                engineering along with management and law and pharmacy and
                computer science and commerce disciplines.
              </p>
              <h6 className=" ff_p mt-5 fw-bold mb-0">
                Campus and Facilities:
              </h6>
              <p className=" ff_p mt-2">
                The University occupies a space of 14.5 acres within the HIMUDA
                Education Hub situated near Kallujhanda village surrounded by
                Shivalik Mountain foots. It features state-of-the-art
                infrastructure, including:
              </p>
              <ul>
                <li className="mt-3 list">Academic blocks</li>
                <li className="mt-3 list">Academic blocks</li>
                <li className="mt-3 list">Academic blocks</li>
                <li className="mt-3 list">Academic blocks</li>
              </ul>
            </Col>
            <Col className="mt-4" md={4}>
              <div className="card text-center p-4">
                <img
                  className="mx-auto"
                  width={100}
                  src={helpline}
                  alt="helpline"
                />
                <h4 className="mt-4 ff_p mb-0 fs_16">
                  Admission Helpline Numbers
                </h4>
                <p className=" ff_p mt-3">+91 9682636956</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DetailsPage;
