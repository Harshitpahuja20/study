import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getFranchiseStatistics } from "../services/statistics.service";
import { useStudy } from "../../context/study.context";

const FranchiseDashboard = () => {
  const {currentUser} = useStudy()
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalStudents: 0,
    totalAppliedResult: 0,
    totalResultIssued: 0,
    balance: 0,
  });

  const getAdminStatistic = async () => {
    try {
      const res = await getFranchiseStatistics();
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
            navigate={() => navigate("/franchise/students/view")}
            title="students"
            value={data?.totalStudents}
            label="Total Students"
            color="primary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/franchise/dashboard")}
            title="wallet"
            value={currentUser?.balance || 0}
            label="wallet balance"
            color="secondary"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/franchise/dashboard")}
            title="Certificate Requests"
            value={data?.totalAppliedResult}
            label="Not Issued To Student "
            color="warning"
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <StatCard
            navigate={() => navigate("/franchise/dashboard")}
            title="Certificate Issued"
            value={data?.totalResultIssued}
            label="Total Certificate Issued"
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

export default FranchiseDashboard;
