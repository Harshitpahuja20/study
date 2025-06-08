import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Row,
  Spinner,
  Table,
  Button,
  Form,
  Col,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { getNews, deleteNews, updateNews } from "../services/adminNews.service";
import { FaPencil } from "react-icons/fa6";
import DeleteModal from "../components/popup/DeleteModal";
import AddModal from "../components/popup/AddModal";
import ViewModal from "../components/popup/ViewModal";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../components/editor/QuillEditor";
import {
    deleteInstitute,
  getInstitute,
  updateInstitute,
} from "../services/AdminInstitute.service";

const AdminViewInstitutes = ({ role }) => {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [dataLoading, setDataLoading] = useState();
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

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getInstitute(page, { role });
    if (response.data.status) {
      setDataLoading(false);
      setTableData(response.data.data);
      setPagination({
        ...pagination,
        totalPages: response.data.totalPages,
      });
    } else {
      setDataLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate is zero-based
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleDelete = async () => {
    try {
      if (selectedData?._id) {
        setLoading(true);
        await deleteInstitute(selectedData?._id).then((response) => {
          setLoading(false);
          if (response.data.status) {
            toast.success(response.data.message);
            fetchData(1 , {role});
            setIsDeletePopup(false);
            setSelectedData(null);
          } else {
            toast.error(response.data.message);
          }
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

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
    form.append("id" , selectedData?._id)
    setLoading(true);

    // Send form data to the backend
    await updateInstitute(form) // Pass FormData here
      .then((res) => {
        if (res.data.status) {
          toast.success(`${role} Updated successfully!`);
          fetchData(1 , {role})
          setSelectedData(null)          // Reset formData after successful submission
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
          setIsEditPopup(false)
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

  const handleEdit = (data) => {
    setSelectedData(data);
    setFormData({
      ...data,
      instituteLogo: null,
    });
    setIsEditPopup(true);
  };

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Assuming you just need the first file
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          View {role === "Collage" ? "College" : role}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Institute Name</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className="py-3">{data?.instituteName}</td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setSelectedData(data);
                              setIsViewPopup(true);
                            }}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => handleEdit(data)}
                          >
                            <FaPencil />
                          </Button>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setSelectedData(data);
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
                    <td colSpan={4} className="text-center py-5">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-5">
                    <Spinner animation="border" />
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          {pagination?.totalPages > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              onPageChange={handlePageClick}
              pageCount={pagination.totalPages}
              forcePage={pagination.currentPage - 1} // Sync with state
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center mt-4"
              pageClassName="page-item"
              pageLinkClassName="page-link rounded px-3 py-2"
              previousClassName="page-item"
              previousLinkClassName="page-link rounded px-3 py-2"
              nextClassName="page-item"
              nextLinkClassName="page-link rounded px-3 py-2"
              breakClassName="page-item"
              breakLinkClassName="page-link rounded px-3 py-2"
              activeClassName="active bg-primary text-white"
            />
          )}
        </div>
      </Row>

      {/* Delete Modal */}
      <DeleteModal
        show={isDeletePopup}
        handleClose={() => setIsDeletePopup(false)}
        onConfirm={handleDelete}
      />

      {/* View Modal */}
      <ViewModal
        show={isViewPopup}
        handleClose={() => setIsViewPopup(false)}
        content={
          <>
            {/* Heading Section */}
            <div className="card p-4 mb-3 shadow-sm">
              <div className="fs-3 fw-bold text-primary mb-2">
                {selectedData?.heading}
              </div>
              <div className="fw-semibold fs-6 text-muted">
                {selectedData?.shortDescription}
              </div>
            </div>

            {/* Description Section */}
            <div className="p-4 bg-light border rounded-3 shadow-sm">
              <div
                className="text-muted fs-5"
                dangerouslySetInnerHTML={{ __html: selectedData?.description }}
              />
            </div>
          </>
        }
        size="lg"
        title="News Article"
        noSize
      />

      {/* Edit Modal */}
      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setSelectedData(null);
        }}
        isUpdate={true}
        size="lg"
        content={
          <>
            <Form>
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
                      <option value={"Central University"}>
                        Central University
                      </option>
                      <option value={"State Government University"}>
                        State Government University
                      </option>
                      <option value={"Deemed University"}>
                        Deemed University
                      </option>
                      <option value={"Private University"}>
                        Private University
                      </option>
                      <option value={"Government College"}>
                        Government College
                      </option>
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
            </Form>
          </>
        }
        onConfirm={handleUpdate}
        title={`Update ${role}`}
        loading={loading}
      />
    </div>
  );
};

export default AdminViewInstitutes;
