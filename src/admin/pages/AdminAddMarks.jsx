import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getsubjects } from "../services/AdminSubjects.service";
import { toast } from "react-toastify";
import { addStudentMarks } from "../services/adminStudent.service";

const AdminAddMarks = () => {
  const navigate = useNavigate();
  const { studentId, courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [issueDate, setIssueDate] = useState(null);

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getsubjects(courseId);
    if (response.data.status) {
      const formattedData = response?.data?.data?.map((item) => ({
        ...item,
        status: "P",
        theoryMarks: "20",
        practicalMarks: "20",
      }));

      setTableData(formattedData);
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
      };

      setLoading(true);

      const res = await addStudentMarks(data);
      if (res.data.status) {
        toast.success("Marks Added Successfully");
        navigate("/admin/students/view");
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

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Student Marks</Breadcrumb.Item>
      </Breadcrumb>

      <Container fluid className="bg-light rounded mt-4 p-3">
        {tableData?.length &&
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
          })}

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
