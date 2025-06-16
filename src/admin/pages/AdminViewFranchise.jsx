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
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import {
  deleteFranchise,
  getFranchises,
  updateFranchise,
} from "../services/adminFranchise.service";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/popup/DeleteModal";
import AddModal from "../components/popup/AddModal";
import { FaPencil } from "react-icons/fa6";

const AdminViewFranchise = () => {
  const [studentFilter, setStudentFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getFranchises(page, {});
    if (response.data.status) {
      setDataLoading(false);
      setTableData(response.data.data);
      setFilteredData(response.data.data);
      setPagination({
        ...pagination,
        totalPages: response.data.data.totalPages,
      });
    } else {
      setDataLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (e) => {
    try {
      if (editFormData?._id) {
        await deleteFranchise(editFormData?._id).then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            navigate("/admin/center/view");
          } else {
            toast.error(response.data.message);
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "franchiseName",
      "state",
      "city",
      "phoneNumber",
      "email",
      "address",
    ];

    for (const field of requiredFields) {
      const value = editFormData[field];
      if (!value) {
        const fieldLabel = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (char) => char.toUpperCase());

        toast.warning(`Please fill in the ${fieldLabel}`);
        return;
      }
    }

    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("id", editFormData._id);
    submissionData.append("franchiseName", editFormData.franchiseName);
    submissionData.append("fullName", editFormData.fullName);
    submissionData.append("phoneNumber", editFormData.phoneNumber);
    submissionData.append("email", editFormData.email);
    if (file) {
      submissionData.append("franchiseProfile", file);
    }
    submissionData.append("franchiseCode", editFormData.franchiseCode);
    submissionData.append("password", editFormData.password);
    submissionData.append("address", editFormData.address);
    submissionData.append("state", editFormData.state);
    submissionData.append("city", editFormData.city);

    await updateFranchise(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          fetchData();
          toast.success("Updated Successfully");
          setEditFormData(null);
          setFile(null);
          setIsEditPopup(false);
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

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setStudentFilter(value);

    if (value === "") {
      setFilteredData(tableData); // If filter is empty, show all data
    } else {
      const filtered = tableData?.filter(
        (center) =>
          (center.userName && center.userName.toLowerCase().includes(value)) ||
          (center.franchiseName &&
            center.franchiseName.toLowerCase().includes(value))
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          View Centers
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={4}>
          <Form.Group controlId="instituteName" className="mb-3">
            <Form.Label className="small fw-semibold">
              Search by center name or username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              name="instituteName"
              value={studentFilter}
              onChange={handleSearchChange}
              className="p-2"
              disabled={tableData?.length === 0}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white">
                  UserName / Password
                </th>
                <th className="py-3 bg-dark text-white">Center Code</th>
                <th className="py-3 bg-dark text-white">Center Details</th>
                <th className="py-3 bg-dark text-white">Address</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {filteredData?.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">
                        <strong className="text-info">{data?.userName}</strong>{" "}
                        <br /> <span className="fw-semibold">Password :</span>{" "}
                        {data?.userName}
                      </td>
                      <td className=" py-3">{data?.franchiseCode}</td>
                      <td className=" py-3">
                        <strong className="text-danger">
                          {data?.franchiseName}
                        </strong>{" "}
                        <br /> ({data?.phoneNumber})
                      </td>
                      <td className=" py-3">
                        {data?.address}
                        <br /> {`${data?.city} - ${data?.state}`}
                      </td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setIsEditPopup(true);
                              setEditFormData(data);
                            }}
                          >
                            <FaPencil />
                          </Button>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setIsDeletePopup(true);
                              setEditFormData(data);
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
      </Row>

      {/* ✅ Edit Modal using your AddModal */}
      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setEditFormData(null);
        }}
        isUpdate={true}
        title="Update Franchise"
        loading={loading}
        size="lg"
        content={
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">
                    Franchise Name
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="franchiseName"
                    value={editFormData?.franchiseName || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="email"
                    name="email"
                    value={editFormData?.email || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">State</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="state"
                    value={editFormData?.state || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">
                    Mobile Number
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="tel"
                    name="phoneNumber"
                    value={editFormData?.phoneNumber || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">
                    Franchise Code
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="franchiseCode"
                    value={editFormData?.franchiseCode || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">City</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="city"
                    value={editFormData?.city || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Address</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="address"
                    value={editFormData?.address || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        }
        onConfirm={handleEditSubmit}
      />

      <DeleteModal
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminViewFranchise;
