import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { studentVerify } from "../../services/student.service";

const StudentHero = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    enrollmentId: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleSubmit = async () => {
    if (!formData?.enrollmentId || !formData?.dob)
      return toast.warning("Both Fields are required!");

    await studentVerify(formData)
      .then(async (res) => {
        if (res.data.status) {
          setFormData({
            enrollmentId: "",
            dob: "",
          });
          setStudent(res?.data?.data);
          toast.success("Student Data Loaded!");
        } else {
          return toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.error(`err in contact us ${err?.message}`);
        return toast.error("Something went wrong! Please try again later");
      });
  };

  return (
    <div className="py-5">
      <Container className="py-4">
        <Row className=" justify-content-center">
          <Col md={5}>
            <div className="card p-4">
              <h4 className=" clr_theme fw-bold mb-0 ff_p">
                Student Verification
              </h4>
              <p className=" mb-0 ff_p mt-1">
                Check your all details before submit
              </p>
              <div className="d-flex mt-4 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Enrollment Number</label>
                <input
                  className="mt-2 py-2 px-3"
                  type="number"
                  name="enrollmentId"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex mt-3 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Date Of Birth</label>
                <input
                  className="mt-2 py-2 px-3"
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData?.dob}
                />
              </div>
              <button className=" bg_theme w-100 py-2 text-white ff_p border-0 mt-4" onClick={handleSubmit}>
                Verify
              </button>
            </div>
          </Col>
        </Row>

        {student !== null && (
          <Row className="mt-5">
            <Card className="border rounded p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">
                Student Information
              </h5>

              <Row className="gy-2">
                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Enrollment No.</strong>
                  <span>: {student?.enrollmentId || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Name</strong>
                  <span>: {student?.studentName || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Course Name</strong>
                  <span>: {student?.courseName || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Session</strong>
                  <span>: {student?.session || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Date Of Birth</strong>
                  <span>: {formatDate(student?.dob)}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Gender</strong>
                  <span>: {student?.gender || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Father Name</strong>
                  <span>: {student?.fatherName || "-"}</span>
                </Col>

                <Col xs={12} md={6} className="d-flex">
                  <strong className="me-2">Mother Name</strong>
                  <span>: {student?.motherName || "-"}</span>
                </Col>

                <Col xs={12} className="d-flex">
                  <strong className="me-2">Address</strong>
                  <span>: {student?.address || "-"}</span>
                </Col>
              </Row>
            </Card>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentHero;
