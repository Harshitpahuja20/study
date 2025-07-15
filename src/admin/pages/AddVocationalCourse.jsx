import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import { toast } from "react-toastify";
import { addvocationCourse } from "../services/AdminVocationalCourse.service";

const AddVocationalCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    mode: "",
    code: "",
    amount: "",
  });

  const durations = [
    "45 DAYS",
    "3 MONTH",
    "1 MONTH",
    "6 MONTH",
    "1 YEAR",
    "2 YEAR",
    "3 YEAR",
    "4 YEAR",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateVocationalCourseForm(formData);
    if (validation.isValid) {
      await addvocationCourse(formData)
        .then((res) => {
          if (res.data.status) {
            toast.success("Added Successfully");
            setFormData({
              name: "",
              duration: "",
              mode: "",
              code: "",
              amount: "",
            });
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err?.message);
          toast.error("Something went wrong!");
        });
    }
  };

  const validateVocationalCourseForm = (formData) => {
    const requiredFields = ["name", "duration", "mode", "code", "amount"];

    for (const field of requiredFields) {
      if (
        formData[field] === undefined ||
        formData[field] === null ||
        formData[field].toString().trim() === ""
      ) {
        toast.warning(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        );
        return {
          isValid: false,
        };
      }
    }

    return { isValid: true };
  };

  return (
    <>
     <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add Vocational Course
        </Breadcrumb.Item>
      </Breadcrumb>
    <Container className="bg-light p-4 rounded">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="courseName">
          <Form.Label className="small fw-semibold">Course Name</Form.Label>
          <Form.Control
            className="py-2"
            type="text"
            placeholder="Enter course name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="courseDuration">
              <Form.Label className="small fw-semibold">
                Course Duration
              </Form.Label>
              <Form.Select
                name="duration"
                className="py-2"
                value={formData.duration}
                onChange={handleChange}
              >
                <option value="">Select duration</option>
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="mode">
              <Form.Label className="small fw-semibold">
                Number Of Mode
              </Form.Label>
              <Form.Control
                className="py-2"
                type="number"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                placeholder="1"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="code">
              <Form.Label className="small fw-semibold">Course Code</Form.Label>
              <Form.Control
                className="py-2"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="CRS-1254"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="amount">
              <Form.Label className="small fw-semibold">
                Total Amount
              </Form.Label>
              <Form.Control
                className="py-2"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="20000"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Button
            className="ms-auto px-5 py-2 text-white fw-bold rounded-2 border-0 bg-dark mt-2 cursor-pointer fit-content"
            type="submit"
            style={{ width: "fit-content" }}
          >
            Add Course
          </Button>
        </Row>
      </Form>
    </Container>
    </>
  );
};

export default AddVocationalCourse;
