import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Form,
  Table,
  Spinner,
} from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import AddModal from "../components/popup/AddModal"; // ✅ your reusable modal
import DeleteModal from "../components/popup/DeleteModal";
import {
  addBalance,
  deleteFranchise,
  getSingleFranchise,
  updateFranchise,
} from "../services/adminFranchise.service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminViewSingleFranchise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [amountPopup, setAmountPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState(NaN);

  const [formData, setFormData] = useState({
    franchiseName: "N/A",
    fullName: "N/A",
    phoneNumber: "N/A",
    email: "N/A",
    franchiseCode: "N/A",
    password: "",
    address: "N/A",
    _id: "N/A",
    image: "N/A",
    balance: 0,
    transactions: [],
  });

  const [editFormData, setEditFormData] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "franchiseName",
      "fullName",
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

    await updateFranchise(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          handleGetSingleFranchise();
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

    // Simulate API call delay
    // setTimeout(() => {
    //   setFormData({ ...editFormData });
    //   setIsEditPopup(false);
    //   setLoading(false);
    //   setEditFormData(null);
    // }, 800);
  };

  function getFormattedDate(isoString) {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const handleDelete = async (e) => {
    try {
      if (id) {
        await deleteFranchise(id).then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            navigate("/admin/franchise/view");
          } else {
            toast.error(response.data.message);
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleGetSingleFranchise = async () => {
    await getSingleFranchise(id)
      .then((res) => {
        if (res?.data?.status) {
          setFormData(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(`Err : ${err?.message}`);
        toast.error("Something went wrong!");
      });
  };

  const handleAddAmount = async () => {
    if (!amount) return toast.warning("Amount is required!");
     setLoading(true)
    await addBalance({ amount, franchiseId: id }).then((res) => {
     setLoading(false)
      if (res.data.status) {
        setAmount(NaN);
        setAmountPopup(false);
        toast.success("Balance updated successfully!");
        handleGetSingleFranchise();
      } else {
        toast.error(res?.data?.message);
      }
    }).catch((err)=>{
      console.log(`Error ${err?.message}`)
      toast.error("Something went wrong!")
    })
  };

  useEffect(() => {
    if (id) {
      handleGetSingleFranchise(id);
    }
  }, [id]);

  return (
    <>
      <Container className="my-4">
        {/* Action Buttons */}
        <div className="d-flex gap-3 mb-4">
          <Button
            variant="success"
            className="fw-semibold px-4"
            onClick={() => {
              setEditFormData({ ...formData, password: "" });
              setIsEditPopup(true);
            }}
          >
            <FaEdit className="me-2" />
            Edit
          </Button>
          <Button
            variant="primary"
            className="fw-semibold px-4"
            onClick={() => setAmountPopup(true)}
          >
            <FaPlusCircle className="me-2" />
            Add Amount
          </Button>
          <Button
            variant="danger"
            className="fw-semibold px-4"
            onClick={() => setIsDeletePopup(true)}
          >
            <FaTrashAlt className="me-2" />
            Delete
          </Button>
        </div>

        {/* Details Card */}
        <Card className="p-4 shadow-sm">
          <Row>
            <Col md={3} className="text-center">
              <Image
                src={`${process.env.REACT_APP_API_URL}/${formData?.image}`}
                roundedCircle
                width={100}
                height={100}
                alt="Profile"
                className="border"
              />
            </Col>
            <Col md={9}>
              <h6 className="fw-bold mb-1">
                {formData.franchiseName} - ({formData.franchiseCode})
              </h6>
              <p className="mb-0">{formData.fullName}</p>
              <p className="text-muted">UID : {formData?._id}</p>
            </Col>
          </Row>

          <hr />

          <Row className="mb-2">
            <Col md={3} className="fw-semibold">
              Phone
            </Col>
            <Col md={1}>:</Col>
            <Col>{formData.phoneNumber}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3} className="fw-semibold">
              Email
            </Col>
            <Col md={1}>:</Col>
            <Col>{formData.email}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3} className="fw-semibold">
              Address
            </Col>
            <Col md={1}>:</Col>
            <Col>{formData.address}</Col>
          </Row>
          <Row>
            <Col md={3} className="fw-semibold">
              Total Balance
            </Col>
            <Col md={1}>:</Col>
            <Col>{`₹ ${formData.balance}`}</Col>
          </Row>
        </Card>

        <Row className="mt-4 mb-3 ms-1">
          <p className="m-0 fs-5 fw-semibold">All Transactions</p>
        </Row>

        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white w-25">Total</th>
                <th className="py-3 bg-dark text-white w-25">Add Amount</th>
                <th className="py-3 bg-dark text-white w-25">Less Amount</th>
                <th className="py-3 bg-dark text-white w-25">Created At</th>
              </tr>
            </thead>
            <tbody style={{ minHeight: "400px" }}>
              {formData?.transactions?.length > 0 ? (
                formData.transactions.map((data, index) => (
                  <tr key={index}>
                    <td className="ps-4 w-25">{data?.total}</td>
                    <td className="w-25">{data?.addAmount || 0}</td>
                    <td className="w-25">{data?.lessAmount || 0}</td>
                    <td className="w-25">
                      {getFormattedDate(data?.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 fs-6">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>

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
              <Col md={12}>
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
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">
                    Full Name
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    name="fullName"
                    value={editFormData?.fullName || ""}
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
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">
                    Profile (Optional)
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
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
                  <Form.Label className="small fw-semibold">
                    Password (Optional)
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="password"
                    name="password"
                    value={editFormData?.password || ""}
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

      {/* // add amount */}

      <AddModal
        show={amountPopup}
        handleClose={() => {
          setAmountPopup(false);
          setAmount(NaN);
        }}
        title="Add amount"
        loading={loading}
        content={
          <Form>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Amount</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    name="amount"
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        }
        onConfirm={handleAddAmount}
      />
    </>
  );
};

export default AdminViewSingleFranchise;
