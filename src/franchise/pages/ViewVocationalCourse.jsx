import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  deletevocationCourse,
  getvocationCourses,
  updatevocationCourse,
} from "../../admin/services/AdminVocationalCourse.service";
import { useNavigate } from "react-router-dom";
import AddModal from "../../admin/components/popup/AddModal";
import DeleteModal from "../../admin/components/popup/DeleteModal";
import { getFranchisevocationalCourses } from "../services/franchiseVocationalCourse.service";

const ViewFranchiseVocationalCourse = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedId, setSelectedId] = useState("");
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    mode: "",
    code: "",
    amount: "",
    id: "",
  });

  const durations = [
    "3 MONTH",
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

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getFranchisevocationalCourses();
    if (response.data.status) {
      setTableData(response.data.data || []);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedId) {
        const response = await deletevocationCourse(selectedId);
        if (response.data.status) {
          toast.success("Deleted Successfully");
          fetchData(pagination.currentPage);
          setIsDeletePopup(false);
          setSelectedId("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      const res = await updatevocationCourse({ ...formData });
      if (res.data?.status) {
        toast.success("Course updated successfully");
        setIsEditPopup(false);
        fetchData(1);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          All Vocational Courses
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Course Name</th>
                <th className="py-3 bg-dark text-white">Duration</th>
                <th className="py-3 bg-dark text-white">Amount</th>
                <th className="py-3 bg-dark text-white">Subjects</th>
                <th className="py-3 bg-dark text-white text-center">Actions</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className="py-3">{data.name}</td>
                      <td className="py-3">{data.duration}</td>
                      <td className="py-3">{data.amount}</td>
                      <td className="py-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            navigate("/franchise/vocationalCourse/subject/details", {
                              state: {
                                id: data?._id,
                                name: data?.name,
                              },
                            });
                            // navigation/modal can go here
                          }}
                        >
                          View Subjects
                        </Button>
                      </td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setSelectedData(data);
                              setFormData({
                                name: data.name || "",
                                duration: data.duration || "",
                                mode: data.mode || "",
                                code: data.code || "",
                                amount: data.amount || "",
                                id: data._id,
                              });
                              setIsEditPopup(true);
                            }}
                          >
                            <FaPencil />
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
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-5 fs-6">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    <Spinner animation="border" />
                  </td>
                </tr>
              </tbody>
            )}
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

      {/* DELETE MODAL */}
      <DeleteModal
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
          setSelectedId("");
        }}
        onConfirm={handleDelete}
      />

      {/* EDIT MODAL */}
      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setFormData({
            name: "",
            duration: "",
            mode: "",
            code: "",
            amount: "",
            id: "",
          });
          setSelectedData(null);
        }}
        isUpdate={true}
        title="Update Vocational Course"
        size="lg"
        loading={loading}
        onConfirm={handleEditSubmit}
        content={
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Course Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter course name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">Duration</label>
              <select
                className="form-select py-2"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              >
                <option value="">Select duration</option>
                {durations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold small">
                Number of Modes
              </label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 1"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold small">
                Course Code
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="e.g. CRS-123"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold small">
                Total Amount
              </label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 20000"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ViewFranchiseVocationalCourse;
