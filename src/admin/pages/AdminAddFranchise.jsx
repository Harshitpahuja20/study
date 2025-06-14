import React, { useState } from "react";
import { Col, Row, Form, Button, Breadcrumb } from "react-bootstrap";
import { addFranchise } from "../services/adminFranchise.service";
import { toast } from "react-toastify";

const AdminAddFranchise = () => {
  const [formData, setFormData] = useState({
    franchiseName: "",
    city: "",
    phoneNumber: "",
    email: "",
    franchiseCode: "",
    state: "",
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
      "city",
      "phoneNumber",
      "email",
      "franchiseCode",
      "state",
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
    submissionData.append("city", formData.city);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("email", formData.email);
    submissionData.append("franchiseProfile", file);
    submissionData.append("franchiseCode", formData.franchiseCode);
    submissionData.append("state", formData.state);
    submissionData.append("address", formData.address);
    submissionData.append("role", "franchise");

    await addFranchise(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          toast.success("Added Successfully");
          setFormData({
            franchiseName: "",
            city: "",
            phoneNumber: "",
            email: "",
            franchiseCode: "",
            state: "",
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
              <Form.Label className="small fw-semibold">Center Name</Form.Label>
              <Form.Control
                type="text"
                name="franchiseName"
                value={formData.franchiseName}
                onChange={handleChange}
                placeholder="Enter center name"
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
              <Form.Label className="small fw-semibold">City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
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
              <Form.Label className="small fw-semibold">State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
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
