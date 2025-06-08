import React, { useState } from "react";
import { Col, Row, Form, Button, Breadcrumb } from "react-bootstrap";
import { addFranchise } from "../services/adminFranchise.service";
import { toast } from "react-toastify";

const AdminAddFranchise = () => {
  const [formData, setFormData] = useState({
    franchiseName: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    franchiseCode: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Generic handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File input handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "franchiseName",
      "fullName",
      "phoneNumber",
      "email",
      "franchiseCode",
      "password",
      "address",
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (!value) {
        const fieldLabel = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (char) => char.toUpperCase());

        toast.warning(`Please fill in the ${fieldLabel}`);
        return;
      }
    }
    console.log(formData.franchiseProfile);
    setLoading(true);
    // ✅ Manually append each field to FormData
    const submissionData = new FormData();
    submissionData.append("franchiseName", formData.franchiseName);
    submissionData.append("fullName", formData.fullName);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("email", formData.email);
    submissionData.append("franchiseProfile", file);
    submissionData.append("franchiseCode", formData.franchiseCode);
    submissionData.append("password", formData.password);
    submissionData.append("address", formData.address);
    submissionData.append("role", "franchise");

    await addFranchise(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          toast.success("Added Successfully");
          setFormData({
            franchiseName: "",
            fullName: "",
            phoneNumber: "",
            email: "",
            franchiseCode: "",
            password: "",
            address: "",
          });
          setFile(null);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong!");
        console.log(`err : ${err?.message}`);
      });
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add Franchise
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">
                Franchise Name
              </Form.Label>
              <Form.Control
                type="text"
                name="franchiseName"
                value={formData.franchiseName}
                onChange={handleChange}
                placeholder="Enter franchise name"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">
                Mobile Number
              </Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">
                Profile Image
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">
                Franchise Code
              </Form.Label>
              <Form.Control
                type="text"
                name="franchiseCode"
                value={formData.franchiseCode}
                onChange={handleChange}
                placeholder="Enter code"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="py-3 bg-transparent"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button
            className="px-4 py-3 border-0 fw-semibold bg-dark mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Franchise"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddFranchise;
