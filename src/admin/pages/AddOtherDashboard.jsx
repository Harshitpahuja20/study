import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import { getAdminHomeStatistics } from "../services/statistics.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddOtherDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalFranchise : 0,
    totalStudents : 0,
    totalCourses : 0,
    totalResults : 0,
  });

  const getAdminStatistic = async () => {
    try {
      const res = await getAdminHomeStatistics();
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
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/admin/franchise/view")}
            title="franchises"
            value={data?.totalFranchise}
            label="Total Franchise"
            color="secondary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/admin/vocationalCourse/view")}
            title="courses"
            value={data?.totalCourses}
            label="Total Course"
            color="primary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/admin/students/view")}
            title="students"
            value={data?.totalStudents}
            label="Total Students"
            color="warning"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/admin/results")}
            title="results"
            value={data?.totalResults}
            label="total results"
            color="info"
          />
        </Col>
      </Row>
    </div>
  );
};

const StatCard = ({ title, value, label, color, navigate }) => (
  <Card
    className="shadow-sm border rounded-3 cursor-pointer h-100"
    onClick={navigate}
  >
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

export default AddOtherDashboard;
