import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStudentwithSubjects,
  getsubjects,
} from "../services/AdminSubjects.service";
import { toast } from "react-toastify";
import { addStudentMarks } from "../services/adminStudent.service";

const AdminAddMarks = () => {
  const navigate = useNavigate();
  const { studentId, courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const [duration, setDuration] = useState("45 Days");

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getStudentwithSubjects(courseId, studentId);
    if (response.data.status) {
      const formattedData = response?.data?.data?.subjects?.map((item) => ({
        ...item,
        status: "P",
        theoryMarks: "25",
        practicalMarks: "25",
      }));

      setTableData(formattedData);
      setStudentData(response?.data?.data?.student);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setTableData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const hasErrors = tableData.some((item, index) => {
        return (
          item.practicalMarks === "" ||
          item.theoryMarks === "" ||
          item.status === ""
        );
      });

      if (hasErrors) {
        toast.warning(
          "Please fill in all fields (practicalMarks, theoryMarks, status) for every subject."
        );
        return;
      }
      if (!issueDate) return toast.warning("Please enter issue date!");

      const data = {
        studentId,
        courseId,
        marks: JSON.stringify(tableData),
        issueDate,
        duration,
      };

      setLoading(true);

      const res = await addStudentMarks(data);
      if (res.data.status) {
        toast.success("Marks Added Successfully");
        navigate("/admin/results/issue");
      } else {
        toast.error(res?.data?.message || "Failed to add marks");
      }
    } catch (error) {
      console.log(error?.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  function getFormattedDate(date) {
      const today = new Date(date);
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Issue Result</Breadcrumb.Item>
      </Breadcrumb>

      <Container fluid className="bg-light rounded mt-4 p-3">
        <h5 className="mb-4">Issue Result</h5>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="enrollmentNumber">
            <Form.Label column sm={3}>
              Enrollment Number
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" value={studentData?.enrollmentId} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="studentName">
            <Form.Label column sm={3}>
              Student Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" value={studentData?.studentName} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="fatherName">
            <Form.Label column sm={3}>
              Father Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" value={studentData?.fatherName} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="dob">
            <Form.Label column sm={3}>
              Date of Birth
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" value={getFormattedDate(studentData?.dob)} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="courseName">
            <Form.Label column sm={3}>
              Course Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                value={`${studentData?.course?.name} (${studentData?.course?.duration})`}
                readOnly
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>

      <Container fluid className="bg-light rounded mt-4 p-3">
        {tableData?.length > 0 ?
          tableData?.map((item, index) => {
            return (
              <Row className="mb-3">
                <Col xs={12} md={4}>
                  <Form.Group controlId="input1">
                    <Form.Label className="fw-semibold small">
                      Subject Name
                    </Form.Label>
                    <Form.Control
                      className="py-2"
                      type="text"
                      value={item?.subjectName}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                  <Form.Group controlId="input2">
                    <Form.Label className="fw-semibold small">
                      Thoery Obtain Marks
                    </Form.Label>
                    <Form.Control
                      className="py-2"
                      type="text"
                      placeholder={`Between ${item?.theoryMax} - ${item?.theoryMin} Marks`}
                      name="theoryMarks"
                      value={item?.theoryMarks}
                      onChange={(e) =>
                        handleChange(index, "theoryMarks", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                  <Form.Group controlId="input3">
                    <Form.Label className="fw-semibold small">
                      Practical Obtain Marks
                    </Form.Label>
                    <Form.Control
                      className="py-2"
                      type="text"
                      placeholder={`Between ${item?.practicalMax} - ${item?.practicalMin} Marks`}
                      name=""
                      value={item?.practicalMarks}
                      onChange={(e) =>
                        handleChange(index, "practicalMarks", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={2}>
                  <Form.Group controlId="input4">
                    <Form.Label className="fw-semibold small">
                      Status
                    </Form.Label>
                    <Form.Control
                      className="py-2"
                      type="text"
                      placeholder="P"
                      value={item?.status}
                      name="status"
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            );
          }) : <div className="fw-semibold text-center my-4">No Subjects Added to this Course Currently! <br /> Please add subjects firstly!</div>}

        <Row>
          <Form.Group controlId="input4">
            <Form.Label className="fw-semibold small">Issue Date</Form.Label>
            <Form.Control
              className="py-2"
              type="date"
              placeholder="Issue Date"
              value={issueDate}
              onChange={(e) => setIssueDate(e?.target?.value)}
            />
          </Form.Group>
          <Form.Group controlId="input4">
            <Form.Label className="fw-semibold small">Duration</Form.Label>
            <Form.Control
              as="select"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target?.value)}
              className="p-2"
            >
              <option value="45 Days">45 Days</option>
              <option value="3 month">3 month</option>
              <option value="6 Month">6 Month</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <button
            className="ms-auto px-4 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
            type="submit" // Ensure this is a submit button
            disabled={loading}
            onClick={handleSubmit}
          >
            {!loading ? "Add" : "Adding..."}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AdminAddMarks;
