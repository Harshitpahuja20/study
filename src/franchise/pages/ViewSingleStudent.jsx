import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Image,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleStudent } from "../../admin/services/adminStudent.service";

const FranchiseStudentDetailsCard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      toast.error("Student Id not found!");
      navigate("/admin/students/view");
      return;
    }
    getSingleStudentDetail();
  }, []);

  const getSingleStudentDetail = async () => {
    setLoading(true);
    await getSingleStudent(id)
      .then((res) => {
        if (res.data.status) {
          setStudent(res?.data?.data);
        } else {
          toast.error(res?.data?.message);
          navigate("/admin/students/view");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
        navigate("/admin/students/view");
      })
      .finally(() => setLoading(false));
  };

  const formatDOB = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          View Student
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container fluid className="bg-light p-4 rounded">
        <div className="d-flex justify-content-start gap-2 mb-3">
          <Button
            variant="primary"
            className="px-4 fw-bold d-flex align-items-center gap-2 bg-dark border-0"
            disabled={student === null}
          >
            <FaPlus className="fs-6" /> Add Marks
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="align-items-center border rounded p-3 bg-white">
            <Col md={3} className="text-center">
              <Image
                src={
                  student?.image
                    ? `${process.env.REACT_APP_API_URL}/${student?.image}`
                    : "https://via.placeholder.com/100"
                }
                roundedCircle
                width={100}
                height={100}
                alt="Student"
              />
              <h5 className="mt-2 text-uppercase mb-0">
                {student?.studentName || "N/A"}
              </h5>
              <small className="text-muted">
                Session : {student?.session || "N/A"}
              </small>
            </Col>

            <Col md={9}>
              <Table borderless size="sm" className="mb-0">
                <tbody>
                  <tr>
                    <td><strong>Student Name</strong></td>
                    <td>:</td>
                    <td>{student?.studentName || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Father Name</strong></td>
                    <td>:</td>
                    <td>{student?.fatherName || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Mother Name</strong></td>
                    <td>:</td>
                    <td>{student?.motherName || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Enrollment Number</strong></td>
                    <td>:</td>
                    <td>{student?.enrollmentId || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Course</strong></td>
                    <td>:</td>
                    <td>{student?.course?.name || student?.course || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Franchise</strong></td>
                    <td>:</td>
                    <td>{student?.franchiseId?.franchiseName || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Date Of Birth</strong></td>
                    <td>:</td>
                    <td>{formatDOB(student?.dob)}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender</strong></td>
                    <td>:</td>
                    <td>{student?.gender || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile</strong></td>
                    <td>:</td>
                    <td>{student?.mobile || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>:</td>
                    <td>{student?.email || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Address</strong></td>
                    <td>:</td>
                    <td>{student?.address || "-"}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default FranchiseStudentDetailsCard;
