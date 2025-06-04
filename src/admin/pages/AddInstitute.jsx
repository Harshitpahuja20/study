import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import QuillEditor from "../components/editor/QuillEditor";
import { addInstitute } from "../services/AdminInstitute.service";

const AddInstitute = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    address: "",
    approvedBy: "",
    city: "",
    state: "",
    instituteType: "",
    role: "",
    instituteLogo: null,
    description: "", // Quill editor content
  });

  const [loading, setLoading] = useState(false);

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change for logo upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Assuming you just need the first file
    }));
  };

  // Handle Quill Editor change
  const handleEditorChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if required fields are provided
    const requiredFields = {
      instituteName: "Institute Name is required!",
      address: "Address is required!",
      description: "Description is required!",
      role: "Role is required!",
      instituteType: "Institute Type is required!",
      state: "State is required!",
      city: "City is required!",
      instituteLogo: "Institute Logo is required!",
      approvedBy: "Approved By is required!",
    };
  
    for (const field in requiredFields) {
      if (!formData[field]) {
        return toast.warning(requiredFields[field]);
      }
    }
  
    // Create a new FormData object to handle file uploads
    const form = new FormData();
    
    // Append form data fields
    for (const field in formData) {
      if (field === "instituteLogo" && formData[field]) {
        // If there's a logo (image file), append it as a file
        form.append("instituteLogo", formData.instituteLogo);
      } else {
        // Append text fields
        form.append(field, formData[field]);
      }
    }
  
    setLoading(true);
  
    // Send form data to the backend
    await addInstitute(form)  // Pass FormData here
      .then((res) => {
        if (res.data.status) {
          toast.success("Institute added successfully!");
  
          // Reset formData after successful submission
          setFormData({
            instituteName: "", // Reset Institute Name
            address: "", // Reset Address
            approvedBy: "", // Reset Approved By
            city: "", // Reset City
            state: "", // Reset State
            instituteType: "", // Reset Institute Type
            role: "", // Reset Role to default Admin
            instituteLogo: null, // Reset Logo (assumes null if no file is uploaded)
            description: "", // Reset Description
          });
  
          setLoading(false); // Stop loading
        } else {
          toast.error(res?.data?.message);
          setLoading(false); // Stop loading if error occurs
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading on error
        toast.error("Error while adding institute!"); // Show error message
      });
  };  

  return (
    <div className="p-3">
      <h2>Add New Institute</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="instituteName" className="mb-3">
              <Form.Label>Institute Name</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2"
              >
                <option value={""}>Select Role</option>
                <option value={"University"}>University</option>
                <option value={"ITI"}>ITI</option>
                <option value={"Collage"}>Collage</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="instituteName" className="mb-3">
              <Form.Label>Institute Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Institute Name"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                className="p-2"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="instituteLogo" className="mb-3">
              <Form.Label>Institute Logo</Form.Label>
              <Form.Control
                type="file"
                name="instituteLogo"
                onChange={handleFileChange}
                className="p-2"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Institute Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="p-2"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="state" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="p-2"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
           <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="instituteType" className="mb-3">
              <Form.Label>Institute Type</Form.Label>
              <Form.Control
                as="select"
                name="instituteType"
                value={formData.instituteType}
                onChange={handleChange}
                className="p-2"
              >
                <option value={""}>Select Institute Type</option>
                <option value={"Central University"}>Central University</option>
                <option value={"State Government University"}>
                  State Government University
                </option>
                <option value={"Deemed University"}>Deemed University</option>
                <option value={"Private University"}>Private University</option>
                <option value={"Government College"}>Government College</option>
                <option value={"Private College"}>Private College</option>
                <option value={"Self-Financed College"}>
                  Self-Financed College
                </option>
                <option value={"Government ITI"}>Government ITI</option>
                <option value={"Private ITI"}>Private ITI</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="approvedBy" className="mb-3">
              <Form.Label>Approved By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Approved By"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleChange}
                className="p-2"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Institute Description</Form.Label>
          <QuillEditor
            value={formData.description}
            onChange={handleEditorChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="ms-auto px-4 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              "Adding..."
            ) : (
              "Add Institute"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddInstitute;
