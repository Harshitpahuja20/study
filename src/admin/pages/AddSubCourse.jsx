import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import QuillEditor from "../components/editor/QuillEditor";
import { Breadcrumb } from "react-bootstrap";
import { addSubCourse } from "../services/adminSubCourse.service";
import { useNavigate, useParams } from "react-router-dom";

const AddSubCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    heading: "",
    duration: "",
    url: "",
    eligibility: "",
    mode: "semester",
    type: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const requiredFields = [
      "heading",
      "duration",
      "url",
      "eligibility",
      "mode",
      "type",
      "description",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.warning(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await addSubCourse({ ...formData, mainCourseId: id });
        if (res.data?.status) {
          toast.success("Sub Course Added Successfully");
          navigate("/admin/course/sub");
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add Sub Course
        </Breadcrumb.Item>
      </Breadcrumb>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">
              Course Heading
            </label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Course Heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Duration</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="3 Months"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold small">URL</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Course URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Eligibility</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="10th Passout"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold small">Mode</label>
            <select
              className="form-select py-2"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
            >
              <option value="semester">Semester</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold small">Course Type</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Bachlor/Master Degree Course"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label mt-2 mb-1">Course Description</label>
            <QuillEditor
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
              placeholder="Enter detailed Course description"
            />
          </div>

          <div className="col-12 text-end">
            <button
              className="ms-auto px-5 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
              type="submit" // Ensure this is a submit button
              disabled={loading}
            >
              {!loading ? "Add" : "Adding..."}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubCourse;
