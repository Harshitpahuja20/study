import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFranchisevocationalCourses } from "../../admin/services/AdminVocationalCourse.service";
import { addStudents } from "../../admin/services/adminStudent.service";

const AddFranchiseStudent = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    mobile: "",
    category: "",
    email: "",
    course: "",
    session: "",
    registrationYear: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [vocationalCourses, setVocationalCourses] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const validate = () => {
    const requiredFields = [
      "studentName",
      "fatherName",
      "motherName",
      "dob",
      "gender",
      "mobile",
      "category",
      "email",
      "course",
      "session",
      "registrationYear",
      "address",
      "image",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(
          `${field.replace(/([A-Z])/g, " $1")} is required`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const data = new FormData();
      for (let key in formData) {
        if (key === "image" && formData.image) {
          data.append("studentProfile", formData.image);
        } else {
          data.append(key, formData[key]);
        }
      }

      setLoading(true);
      try {
        const res = await addStudents(data);
        if (res.data.status) {
          toast.success("Student Added Successfully");
          setFormData({
            studentName: "",
            fatherName: "",
            motherName: "",
            dob: "",
            gender: "",
            mobile: "",
            category: "",
            email: "",
            course: "",
            session: "",
            registrationYear: "",
            address: "",
            image: null,
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          toast.error(res?.data?.message || "Failed to add student");
        }
      } catch (error) {
        console.error(error?.message);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchVocationalCourse = async () => {
    try {
      const res = await getFranchisevocationalCourses();
      console.log(res)
      if (res?.data?.status) {
        setVocationalCourses(res.data.data);
      }
    } catch (err) {
      console.log(`Error : ${err?.message}`);
    }
  };

  useEffect(() => {
    fetchVocationalCourse();
  }, []);

  return (
    <div className="container mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add Students
        </Breadcrumb.Item>
      </Breadcrumb>
      <ToastContainer />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Student Name</label>
            <input
              type="text"
              className="form-control py-2"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Father Name</label>
            <input
              type="text"
              className="form-control py-2"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Enter father name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Mother Name</label>
            <input
              type="text"
              className="form-control py-2"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Enter mother name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Date of Birth</label>
            <input
              type="date"
              className="form-control py-2"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Gender</label>
            <input
              type="text"
              className="form-control py-2"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Enter gender"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Mobile</label>
            <input
              type="text"
              className="form-control py-2"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Category</label>
            <input
              type="text"
              className="form-control py-2"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Email</label>
            <input
              type="email"
              className="form-control py-2"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Course</label>
            <select
              name="course"
              className="form-select py-2"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {vocationalCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Session</label>
            <input
              type="text"
              className="form-control py-2"
              name="session"
              value={formData.session}
              onChange={handleChange}
              placeholder="Enter session"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Registration Year</label>
            <input
              type="text"
              className="form-control py-2"
              name="registrationYear"
              value={formData.registrationYear}
              onChange={handleChange}
              placeholder="Enter registration year"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Address</label>
            <input
              type="text"
              className="form-control py-2"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold small">Student Photo</label>
            <input
              type="file"
              className="form-control py-2"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </div>

          <div className="col-md-12 text-end">
            <button
              className="ms-auto px-4 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFranchiseStudent;
