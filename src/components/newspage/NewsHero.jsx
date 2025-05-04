import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const NewsHero = () => {
  return (
    <div className="py-5">
      <Container className="py-4">
        <h4 className=" ff_p mb-0 fw-bold">Latest News.</h4>
        <p className=" ff_p mb-0 mt-1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas,
          doloremque.
        </p>
        <Row>
          <Col lg={3} md={4} sm={6} className="mt-4 col-12">
            <div className="card p-3 py-4 rounded-1">
              <div>
                <span className="bg_theme px-3 py-1 rounded-1 text-white ff_p">
                  Date : 17/01/2025
                </span>
                <h6 className=" ff_p fw-semibold mt-4 ">
                  POST NAME - Officer Grade B (Manager) and Officer Grade A
                  (Assistant Manager) – 19 Posts
                </h6>
                <p className=" ff_p mt-2 mb-0">
                  QUALIFICATION- Any Master’s Degree (Relevant Discipline)
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={4} sm={6} className="mt-4 col-12">
            <div className="card p-3 py-4 rounded-1">
              <div>
                <span className="bg_theme px-3 py-1 rounded-1 text-white ff_p">
                  Date : 17/01/2025
                </span>
                <h6 className=" ff_p fw-semibold mt-4 ">
                  POST NAME - Officer Grade B (Manager) and Officer Grade A
                  (Assistant Manager) – 19 Posts
                </h6>
                <p className=" ff_p mt-2 mb-0">
                  QUALIFICATION- Any Master’s Degree (Relevant Discipline)
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={4} sm={6} className="mt-4 col-12">
            <div className="card p-3 py-4 rounded-1">
              <div>
                <span className="bg_theme px-3 py-1 rounded-1 text-white ff_p">
                  Date : 17/01/2025
                </span>
                <h6 className=" ff_p fw-semibold mt-4 ">
                  POST NAME - Officer Grade B (Manager) and Officer Grade A
                  (Assistant Manager) – 19 Posts
                </h6>
                <p className=" ff_p mt-2 mb-0">
                  QUALIFICATION- Any Master’s Degree (Relevant Discipline)
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={4} sm={6} className="mt-4 col-12">
            <div className="card p-3 py-4 rounded-1">
              <div>
                <span className="bg_theme px-3 py-1 rounded-1 text-white ff_p">
                  Date : 17/01/2025
                </span>
                <h6 className=" ff_p fw-semibold mt-4 ">
                  POST NAME - Officer Grade B (Manager) and Officer Grade A
                  (Assistant Manager) – 19 Posts
                </h6>
                <p className=" ff_p mt-2 mb-0">
                  QUALIFICATION- Any Master’s Degree (Relevant Discipline)
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsHero;
