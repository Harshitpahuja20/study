import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Form, useNavigate, useParams } from "react-router-dom";
import { deleteresult, getSingleresult } from "../services/adminResult.service";
import { toast } from "react-toastify";
import DeleteModal from "../components/popup/DeleteModal";
import AddModal from "../components/popup/AddModal";
import { updateStudentMarks } from "../services/adminStudent.service";

const FranchiseViewSingleStudentMarks = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popUpLoading, setPopUpLoading] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const res = await getSingleresult(id);
      setLoading(false);

      if (res?.data?.status) {
        const data = res.data.data;
        setResult(data);
        localStorage.setItem("mark", JSON.stringify(data?.marks));
      } else {
        toast.error(res?.data?.message || "Error fetching result.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchResult();
  }, [id]);

  const handleDelete = async () => {
    if (!result?._id) return;

    try {
      const response = await deleteresult(result._id);
      if (response.data.status) {
        toast.success("Deleted Successfully");
        navigate("/admin/results");
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      marks: prev.marks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`; // format required by input[type="date"]
  };

  const openEditModal = () => {
    setIsEditPopup(true);
    setFormData({
      marks: result?.marks || [],
      issueDate: result?.issueDate
        ? formatDateToYYYYMMDD(result.issueDate)
        : "",
    });
  };

  const handleUpdate = async () => {
    try {
      const hasErrors = formData?.marks?.some((item, index) => {
        return (
          item.practicalMarks === "" ||
          item.theoryMarks === "" ||
          item.status === ""
        );
      });

      if (hasErrors) {
        toast.warning(
          "Please fill in all fields (practicalMarks, theoryMarks, status) for every subject."
        );
        return;
      }
      if (!formData?.issueDate)
        return toast.warning("Please enter issue date!");

      const data = {
        id,
        marks: JSON.stringify(formData.marks),
        issueDate: formData?.issueDate,
      };

      setPopUpLoading(true);

      const res = await updateStudentMarks(data);
      if (res.data.status) {
        toast.success("Marks Added Successfully");
      } else {
        toast.error(res?.data?.message || "Failed to add marks");
      }
    } catch (error) {
      console.log(error?.message);
      toast.error("Something went wrong");
    } finally {
        setIsEditPopup(false);
        setPopUpLoading(false);
        fetchResult();    
    }
  };

  const renderTableRows = () =>
    result?.marks?.map((mark) => {
      const total = parseInt(mark.theoryMarks) + parseInt(mark.practicalMarks);
      return (
        <tr key={mark._id}>
          <td>{mark.subjectName}</td>
          <td>{mark.theoryMax}</td>
          <td>{mark.practicalMax}</td>
          <td>{mark.theoryMin}</td>
          <td>{mark.practicalMin}</td>
          <td>{mark.theoryMarks}</td>
          <td>{mark.practicalMarks}</td>
          <td>=</td>
          <td>{total}</td>
          <td>{mark.status}</td>
        </tr>
      );
    });

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>View Marks</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="bg-white p-4 mt-4 rounded shadow">
        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              className="me-2"
              onClick={openEditModal}
              disabled={!result}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsDeletePopup(true)}
              disabled={!result}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <h4 className="mb-3 fs-5">Theory & Practical Marks</h4>

        {result ? (
          <Table bordered hover responsive className="text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th rowSpan="2">Subject</th>
                <th colSpan="2">Max Marks</th>
                <th colSpan="2">Min Marks</th>
                <th colSpan="4">Obtain</th>
                <th rowSpan="2">Status</th>
              </tr>
              <tr>
                <th>Theory</th>
                <th>Practical</th>
                <th>Theory</th>
                <th>Practical</th>
                <th>Th.</th>
                <th>Prac.</th>
                <th>=</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>
        ) : (
          !loading && <>No Result Found</>
        )}
      </Container>

      {/* Delete Modal */}
      <DeleteModal
        show={isDeletePopup}
        handleClose={() => setIsDeletePopup(false)}
        onConfirm={handleDelete}
      />

      {/* Edit Modal */}
      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setFormData(null);
        }}
        isUpdate
        title="Update Vocational Course"
        size="xl"
        loading={popUpLoading}
        onConfirm={handleUpdate}
        content={
          <>
            {formData?.marks?.map((item, index) => (
              <div className="row mb-3" key={`${item.subjectName}-${index}`}>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold small">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    value={item.subjectName}
                    disabled
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label fw-semibold small">
                    Theory Obtain Marks
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    name="theoryMarks"
                    placeholder={`Between ${item.theoryMax} - ${item.theoryMin}`}
                    value={item.theoryMarks}
                    onChange={(e) =>
                      handleChange(index, "theoryMarks", e.target.value)
                    }
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label fw-semibold small">
                    Practical Obtain Marks
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    name="practicalMarks"
                    placeholder={`Between ${item.practicalMax} - ${item.practicalMin}`}
                    value={item.practicalMarks}
                    onChange={(e) =>
                      handleChange(index, "practicalMarks", e.target.value)
                    }
                  />
                </div>

                <div className="col-12 col-md-2">
                  <label className="form-label fw-semibold small">Status</label>
                  <input
                    type="text"
                    className="form-control py-2"
                    name="status"
                    placeholder="P"
                    value={item.status}
                    onChange={(e) =>
                      handleChange(index, "status", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label fw-semibold small">
                  Issue Date
                </label>
                <input
                  type="date"
                  className="form-control py-2"
                  value={formData?.issueDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      issueDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default FranchiseViewSingleStudentMarks;
