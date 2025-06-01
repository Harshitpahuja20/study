import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import DeleteModal from "../components/popup/DeleteModal";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  deleteContactQueries,
  getContactQueries,
} from "../services/adminContactQueries.service";
import {
  deleteSubCourse,
  getSubCourses,
  updateSubCourse,
} from "../services/adminSubCourse.service";
import AddModal from "../components/popup/AddModal";
import QuillEditor from "../components/editor/QuillEditor"; // Assuming you're using this

const AdminViewSubCourses = () => {
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
  const [formData, setFormData] = useState({
    heading: "",
    duration: "",
    url: "",
    eligibility: "",
    mode: "",
    type: "",
    description: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);

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

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getSubCourses(page);
    if (response.data.status) {
      setTableData(response.data.data || []);
      setPagination({
        currentPage: page,
        totalPages: response.data.data.totalPages || 1,
      });
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    try {
      if (selectedId) {
        const response = await deleteSubCourse(selectedId);
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
      const res = await updateSubCourse({ ...formData, id: formData?.id });
      if (res.data?.status) {
        toast.success("Sub Course Added Successfully");
        setIsEditPopup(false);
        fetchData(1);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          All Sub Courses
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Sub Course Name</th>
                <th className="py-3 bg-dark text-white">Stream</th>
                <th className="py-3 bg-dark text-white">Created At</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className="py-3">{data.heading}</td>
                      <td className="py-3">{data?.mainCourseId?.streamName}</td>
                      <td className="py-3">
                        {getFormattedDate(data.createdAt)}
                      </td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center gap-2">
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
                              setSelectedData(data);
                              setFormData({
                                heading: data.heading || "",
                                duration: data.duration || "",
                                url: data.url || "",
                                eligibility: data.eligibility || "",
                                mode: data.mode || "",
                                type: data.type || "",
                                description: data.description || "",
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
                    <td colSpan={5} className="text-center py-5 fs-6">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center py-5">
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

      <DeleteModal
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
          setSelectedId("");
        }}
        onConfirm={handleDelete}
      />

      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setSelectedData(null);
          setFormData({
            heading: "",
            duration: "",
            url: "",
            eligibility: "",
            mode: "",
            type: "",
            description: "",
          });
        }}
        isUpdate={true}
        size="lg"
        title="Update Sub Course"
        onConfirm={handleEditSubmit}
        loading={loading}
        content={
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
              <label className="form-label fw-semibold small">
                Eligibility
              </label>
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
              <label className="form-label fw-semibold small">
                Course Type
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Bachelors/Masters"
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
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                placeholder="Enter detailed Course description"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AdminViewSubCourses;
