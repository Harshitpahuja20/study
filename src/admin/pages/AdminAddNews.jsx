import React, { useState } from "react";
import { Breadcrumb, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addNews } from "../services/adminNews.service";
import QuillEditor from "../components/editor/QuillEditor";

const AdminAddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "", // Add a description field for the editor
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) return toast.warning("News Heading is required!");
    if (!formData.shortDescription)
      return toast.warning("Short Description is required!");
    if (!formData.description) return toast.warning("Description is required");

    setLoading(true);

    const submissionData = {
      heading: formData.title,
      shortDescription: formData.shortDescription,
      description: formData.description, // Pass the description field
    };

    await addNews(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          toast.success("Added Successfully");
          setFormData({
            title: "",
            shortDescription: "",
            description: "", // Reset description as well
          });
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
    <div className="p-2">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add News
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">News Heading</Form.Label>
          <Form.Control
            placeholder="Heading"
            className="py-2"
            onChange={handleChange}
            name="title"
            value={formData.title}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">News Short Description</Form.Label>
          <Form.Control
            placeholder="Short Description"
            className="py-2"
            onChange={handleChange}
            name="shortDescription"
            value={formData.shortDescription}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">News Description</Form.Label>

          {/* Use QuillEditor Component */}
          <QuillEditor
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="Enter detailed news description"
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <button
            className="ms-auto px-4 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
            type="submit" // Ensure this is a submit button
            disabled={loading}
          >
            {!loading ? "Add" : "Adding..."}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddNews;
