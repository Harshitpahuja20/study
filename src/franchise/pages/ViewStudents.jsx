import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
  updateStudents,
} from "../services/franchiseAddStudent.service";
import { getFranchisevocationalCourses } from "../services/franchiseVocationalCourse.service";
import AddModal from "../../admin/components/popup/AddModal";
import DeleteModal from "../../admin/components/popup/DeleteModal";

const FranchiseViewStudents = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedId, setSelectedId] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vocationalCourses, setVocationalCourses] = useState([]);
  const [formData, setFormData] = useState({});

  const getFormattedDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    fetchData(newPage);
  };

  const fetchVocationalCourse = async () => {
    try {
      const res = await getFranchisevocationalCourses();
      if (res?.data?.status) {
        setVocationalCourses(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching vocational courses:", err);
    }
  };

  const fetchData = async (page = 1) => {
    setDataLoading(true);
    try {
      const response = await getStudents(page);
      if (response.data.status) {
        setTableData(response.data.data);
        setPagination((prev) => ({
          ...prev,
          totalPages: response.data.data.totalPages,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Error fetching students.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    fetchVocationalCourse();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteStudent(selectedId);
      if (response.data.status) {
        toast.success("Deleted Successfully");
        fetchData(pagination.currentPage);
        setIsDeletePopup(false);
        setSelectedId("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`${field.replace(/([A-Z])/g, " $1")} is required`);
        return false;
      }
    }
    return true;
  };

  const handleEditSubmit = async () => {
    if (!validate()) return;
    const data = new FormData();
    for (let key in formData) {
      console.log(key);
      if (key === "image" && formData.image) {
        data.append("studentProfile", formData.image);
      } else {
        data.append(key, formData[key]);
      }
    }
    setLoading(true);
    try {
      const res = await updateStudents(data);
      if (res.data.status) {
        toast.success("Student updated successfully");
        setIsEditPopup(false);
        fetchData(pagination.currentPage);
      } else {
        toast.error(res?.data?.message || "Failed to update student");
      }
    } catch (err) {
      toast.error("Error updating student");
    } finally {
      setLoading(false);
    }
  };

  const formatDOBForInput = (dobString) => {
    if (!dobString) return "";
    const date = new Date(dobString);
    return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/franchise/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Students
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="bg-dark text-white py-3 ">Profile</th>
                <th className="bg-dark text-white py-3 ">Details</th>
                <th className="bg-dark text-white py-3 ">Subject / Comment</th>
                <th className="bg-dark text-white py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!dataLoading ? (
                tableData.length ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td>
                        {data?.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${data?.image}`}
                            width={100}
                            height={100}
                            className="object-fit-cover"
                            alt="Student"
                          />
                        )}
                      </td>
                      <td>
                        {data?.studentName}
                        <br />
                        {data?.mobile}
                        <br />
                        {data?.email}
                      </td>
                      <td>
                        {data?.vocationalCourse?.name}
                        <br />
                        {data?.vocationalCourse?.duration}
                        <br />
                        {data?.vocationalCourse?.code}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() =>
                              navigate(`/franchise/student/view/${data._id}`)
                            }
                          >
                            <FaEye />
                          </Button>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setSelectedId(data._id);
                              setIsDeletePopup(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setFormData({
                                ...data,
                                course: data.course?._id || data.course,
                                dob: formatDOBForInput(data.dob),
                                id: data?._id,
                              });
                              setIsEditPopup(true);
                            }}
                          >
                            <FaPencil />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      No Data Found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <Spinner animation="border" />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              onPageChange={handlePageClick}
              pageCount={pagination.totalPages}
              forcePage={pagination.currentPage - 1}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center mt-4"
              pageClassName="page-item"
              pageLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              previousClassName="page-item"
              previousLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              nextClassName="page-item"
              nextLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              breakClassName="page-item"
              breakLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              activeClassName="active bg-primary text-white"
            />
          </div>
        )}
      </Row>

      <DeleteModal
        show={isDeletePopup}
        handleClose={() => setIsDeletePopup(false)}
        onConfirm={handleDelete}
      />

      <AddModal
        show={isEditPopup}
        handleClose={() => setIsEditPopup(false)}
        onConfirm={handleEditSubmit}
        isUpdate={true}
        size="lg"
        loading={loading}
        title="Update Student"
        content={
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Student Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                name="studentName"
                value={formData.studentName || ""}
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Father Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                name="fatherName"
                value={formData.fatherName || ""}
                onChange={handleChange}
                placeholder="Enter father name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Mother Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                name="motherName"
                value={formData.motherName || ""}
                onChange={handleChange}
                placeholder="Enter mother name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control py-2"
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">Gender</label>
              <input
                type="text"
                className="form-control py-2"
                name="gender"
                value={formData.gender || ""}
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
                value={formData.mobile || ""}
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
                value={formData.category || ""}
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
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">Course</label>
              <select
                name="course"
                className="form-select py-2"
                value={formData.course || ""}
                onChange={handleChange}
                disabled
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
                value={formData.session || ""}
                onChange={handleChange}
                placeholder="Enter session"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Registration Year
              </label>
              <input
                type="text"
                className="form-control py-2"
                name="registrationYear"
                value={formData.registrationYear || ""}
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
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label fw-semibold small">
                Student Photo
              </label>
              <input
                type="file"
                className="form-control py-2"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default FranchiseViewStudents;
