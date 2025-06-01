import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import { getAdminStatistics } from "../services/statistics.service";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalNews: 0,
    totalStreams: 0,
    totalPlaces: 0,
    totalFranchiseRequests: 0,
    totalStudentRequests: 0,
    totalMainCourses: 0,
    totalSubCourses: 0,
    totalUniversities: 0,
    totalColleges: 0,
    totalITIs: 0,
    totalContacts: 0,
  });

  const getAdminStatistic = async () => {
    try {
      const res = await getAdminStatistics();
      if (res?.data?.status) {
        setData(res.data.data);
      } else {
        toast.error(res?.data?.message || "Failed to fetch stats");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getAdminStatistic();
  }, []);

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="news published"
            value={data.totalNews}
            label="Total Published News"
            color="primary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="streams"
            value={data.totalStreams}
            label="Total Streams"
            color="warning"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="study places"
            value={data.totalPlaces}
            label="Total study places"
            color="info"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="franchise requests"
            value={data.totalFranchiseRequests}
            label="Total franchise requests"
            color="success"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="courses"
            value={data.totalMainCourses}
            label="Total courses"
            color="secondary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="sub courses"
            value={data.totalSubCourses}
            label="Total sub courses"
            color="danger"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="student request"
            value={data.totalStudentRequests}
            label="Total student request"
            color="warning"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="university"
            value={data.totalUniversities}
            label="Total university"
            color="dark"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="colleges"
            value={data.totalColleges}
            label="Total colleges"
            color="success"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="iti"
            value={data.totalITIs}
            label="Total iti"
            color="info"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            title="contacts"
            value={data.totalContacts}
            label="Total Contacts"
            color="secondary"
          />
        </Col>
      </Row>
    </div>
  );
};

const StatCard = ({ title, value, label, color }) => (
  <Card className="shadow-sm border rounded-3 h-100">
    <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
      <div
        className="text-uppercase fw-semibold mb-3 text-start w-100"
        style={{ fontSize: "12px" }}
      >
        {title}
      </div>
      <div className={`fw-bold fs-3 text-${color}`}>{value}</div>
      <div
        className={`text-uppercase mt-1 fw-semibold text-${color}`}
        style={{ fontSize: "12px" }}
      >
        {label}
      </div>
    </Card.Body>
  </Card>
);

export default AdminDashboard;
