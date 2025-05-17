import React from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

const FranchiseDashobard = () => {
  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/franchise/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>news published</div>
              <div className="fw-bold fs-3 text-primary">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-primary" style={{fontSize : "12px"}}>Total Published News</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>streams</div>
              <div className="fw-bold fs-3 text-warning">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-warning" style={{fontSize : "12px"}}>Total Streams</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>study places</div>
              <div className="fw-bold fs-3 text-info">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-info" style={{fontSize : "12px"}}>Total study places</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>franchise requests</div>
              <div className="fw-bold fs-3 text-success">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-success" style={{fontSize : "12px"}}>Total franchise requests</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>courses</div>
              <div className="fw-bold fs-3 text-secondary">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-secondary" style={{fontSize : "12px"}}>Total courses</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>sub courses</div>
              <div className="fw-bold fs-3 text-danger">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-danger" style={{fontSize : "12px"}}>Total sub courses</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>student request</div>
              <div className="fw-bold fs-3 text-warning">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-warning" style={{fontSize : "12px"}}>Total student request</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>university</div>
              <div className="fw-bold fs-3 text-dark">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-dark" style={{fontSize : "12px"}}>Total university</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>colleges</div>
              <div className="fw-bold fs-3 text-success">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-success" style={{fontSize : "12px"}}>Total colleges</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="text-uppercase fw-semibold mb-3 text-start w-100" style={{fontSize : "12px"}}>iti</div>
              <div className="fw-bold fs-3 text-info">6</div>
              <div className="text-uppercase mt-1 fw-semibold text-info" style={{fontSize : "12px"}}>Total iti</div>
            </Card.Body>
          </Card>
        </Col>

        {/* You can add more cards like this for stats like "Total Enquiries", "New Registrations", etc. */}
      </Row>
    </div>
  );
};

export default FranchiseDashobard;
