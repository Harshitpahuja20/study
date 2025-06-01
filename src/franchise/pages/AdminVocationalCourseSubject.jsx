import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Breadcrumb,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addsubject,
  deletesubject,
  getsubjects,
  updatesubject,
} from "../../admin/services/AdminSubjects.service";
import AddModal from "../../admin/components/popup/AddModal";
import DeleteModal from "../../admin/components/popup/DeleteModal";

const FranchiseSubjectForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    subjectName: "",
    theoryMax: "",
    theoryMin: "",
    practicalMax: "",
    practicalMin: "",
    vocationalCourseId: location.state.id,
  });
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key].toString().trim()) {
        toast.warning(`${key} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await addsubject(formData)
      .then((res) => {
        if (res.data.status) {
          toast.success("Added Successfully");
          setFormData({
            subjectName: "",
            theoryMax: "",
            theoryMin: "",
            practicalMax: "",
            practicalMin: "",
            vocationalCourseId: location.state.id,
          });
          fetchData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getsubjects(location.state.id);
    if (response.data.status) {
      setTableData(response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedId) {
        const response = await deletesubject(selectedId);
        if (response.data.status) {
          toast.success("Deleted Successfully");
          fetchData();
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
      const res = await updatesubject({ ...formData });
      if (res.data?.status) {
        toast.success("Subject updated successfully");
        setIsEditPopup(false);
        fetchData();
        setFormData({
          subjectName: "",
          theoryMax: "",
          theoryMin: "",
          practicalMax: "",
          practicalMin: "",
          vocationalCourseId: location.state.id,
        });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Subject</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="bg-light p-4 rounded">
        <Row>
          <h6 className="text-uppercase">{location.state.name}</h6>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3 align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Subject Name
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  placeholder="e.g. English"
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Theory Max
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="number"
                  name="theoryMax"
                  value={formData.theoryMax}
                  onChange={handleChange}
                  placeholder="e.g. 70"
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Theory Min
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="number"
                  name="theoryMin"
                  value={formData.theoryMin}
                  onChange={handleChange}
                  placeholder="e.g. 28"
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Practical Max
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="number"
                  name="practicalMax"
                  value={formData.practicalMax}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Practical Min
                </Form.Label>
                <Form.Control
                  className="py-2"
                  type="number"
                  name="practicalMin"
                  value={formData.practicalMin}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                />
              </Form.Group>
            </Col>

            <Col md={1} className="text-end">
              <Button
                type="submit"
                className="mt-2 px-4 bg-dark text-white border-0"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container className="mt-4 rounded">
        <Row>
          <div className="table-responsive border p-0 rounded">
            <Table hover responsive className="align-middle mb-0">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                  <th className="py-3 bg-dark text-white">Subject Name</th>
                  <th className="py-3 bg-dark text-white">Practical Min</th>
                  <th className="py-3 bg-dark text-white">Theory Min</th>
                  <th className="py-3 bg-dark text-white">Practical Max</th>
                  <th className="py-3 bg-dark text-white">Theory Max</th>
                  <th className="py-3 bg-dark text-white text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              {!dataLoading ? (
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((data, index) => (
                      <tr key={data._id}>
                        <td className="ps-4 py-3">{index + 1}</td>
                        <td>{data.subjectName}</td>
                        <td>{data.practicalMin}</td>
                        <td>{data.theoryMin}</td>
                        <td>{data.practicalMax}</td>
                        <td>{data.theoryMax}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant=""
                              size="sm"
                              onClick={() => {
                                setFormData({
                                  subjectName: data.subjectName,
                                  theoryMax: data.theoryMax,
                                  theoryMin: data.theoryMin,
                                  practicalMax: data.practicalMax,
                                  practicalMin: data.practicalMin,
                                  vocationalCourseId: data.vocationalCourseId,
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
                      <td colSpan={7} className="text-center py-5">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>
        </Row>
      </Container>

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
          setFormData({
            subjectName: "",
            theoryMax: "",
            theoryMin: "",
            practicalMax: "",
            practicalMin: "",
            vocationalCourseId: location.state.id,
          });
        }}
        isUpdate={true}
        title="Update Subject"
        size="lg"
        loading={loading}
        onConfirm={handleEditSubmit}
        content={
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-semibold small">
                Subject Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="e.g. English"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">Theory Max</label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 70"
                name="theoryMax"
                value={formData.theoryMax}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">Theory Min</label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 28"
                name="theoryMin"
                value={formData.theoryMin}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Practical Max
              </label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 50"
                name="practicalMax"
                value={formData.practicalMax}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                Practical Min
              </label>
              <input
                type="number"
                className="form-control py-2"
                placeholder="e.g. 20"
                name="practicalMin"
                value={formData.practicalMin}
                onChange={handleChange}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default FranchiseSubjectForm;
