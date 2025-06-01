import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Row, Spinner, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getStreams } from "../services/adminStreams.service";
import DeleteModal from "../components/popup/DeleteModal";
import ReactPaginate from "react-paginate";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import AddModal from "../components/popup/AddModal";
import {
  addMainCourse,
  deleteMainCourse,
  getMainCourses,
  updateMainCourse,
} from "../services/adminMainCourse.service";
import { useNavigate } from "react-router-dom";

const AddMainCourse = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    stream: "",
    heading: "",
    url: "",
    shortName: "",
  });
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { stream, heading, url, shortName } = formData;
    if (!stream) return toast.error("Please select a stream") || false;
    if (!heading.trim()) return toast.error("Course Heading is required") || false;
    if (!url.trim()) return toast.error("Course URL is required") || false;
    if (!shortName.trim()) return toast.error("Short Name is required") || false;
    return true;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const streamName = streams.find((s) => s._id === formData.stream)?.title || "";
    const payload = { ...formData, stremId: formData.stream, streamName };
    try {
      const res = await addMainCourse(payload);
      if (res.data?.status) {
        toast.success("Main Course Added Successfully");
        fetchCourses(1);
        setFormData({ stream: "", heading: "", url: "", shortName: "" });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleEditSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const payload = {
      ...formData,
      id: selectedId,
    };
    try {
      const res = await updateMainCourse(payload);
      if (res.data?.status) {
        toast.success("Main Course Updated Successfully");
        fetchCourses(1);
        setIsEditPopup(false);
        setSelectedId("");
        setFormData({ stream: "", heading: "", url: "", shortName: "" });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStreams(1);
    fetchCourses(1);
  }, []);

  const fetchStreams = async (page) => {
    const response = await getStreams(page, {});
    if (response.data.status) {
      setStreams(response.data.data);
    }
  };

  const fetchCourses = async (page) => {
    const response = await getMainCourses(page, {});
    if (response.data.status) {
      setTableData(response.data.data);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedId) {
        const response = await deleteMainCourse(selectedId);
        if (response.data.status) {
          toast.success(response.data.message);
          fetchCourses(1);
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

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add Main Course
        </Breadcrumb.Item>
      </Breadcrumb>

      <form onSubmit={handleAddSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold small">Select Stream</label>
            <select className="form-select py-2" name="stream" value={formData.stream} onChange={handleChange}>
              <option value="">Choose Stream</option>
              {streams?.map((stream) => (
                <option key={stream?._id} value={stream?._id}>{stream?.title}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold small">Course Heading</label>
            <input type="text" className="form-control py-2" placeholder="Heading" name="heading" value={formData.heading} onChange={handleChange} />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold small">Course URL</label>
            <input type="text" className="form-control py-2" placeholder="arts-social-science" name="url" value={formData.url} onChange={handleChange} />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold small">Short Name</label>
            <input type="text" className="form-control py-2" placeholder="Short Name" name="shortName" value={formData.shortName} onChange={handleChange} />
          </div>

          <div className="col-12 mt-2">
            <button className="ms-auto px-5 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer" type="submit" disabled={loading}>
              {!loading ? "Add" : "Adding..."}
            </button>
          </div>
        </div>
      </form>

      <Row className="mt-5">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Stream</th>
                <th className="py-3 bg-dark text-white">Heading</th>
                <th className="py-3 bg-dark text-white">Short Name</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.length > 0 ? (
                tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="ps-4">{index + 1}</td>
                    <td>{data?.streamName}</td>
                    <td>{data?.heading}</td>
                    <td>{data?.shortName}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Button variant="" size="sm" onClick={() => { setSelectedId(data?._id); setIsDeletePopup(true); }}><FaTrash /></Button>
                        <Button variant="" size="sm" onClick={() => {
                          setFormData({
                            stream: data?.streamId || "",
                            heading: data?.heading || "",
                            url: data?.url || "",
                            shortName: data?.shortName || "",
                          });
                          setSelectedId(data?._id);
                          setIsEditPopup(true);
                        }}><BsFillPencilFill /></Button>
                        <Button variant="" size="sm" onClick={() => {navigate(`/admin/course/sub/add/${data?._id}`)}}><FaPlus /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5 fs-6">No Data Found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Row>

      <DeleteModal
        show={isDeletePopup}
        handleClose={() => { setIsDeletePopup(false); setSelectedId(""); }}
        onConfirm={handleDelete}
      />

      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setSelectedId("");
          setFormData({ stream: "", heading: "", url: "", shortName: "" });
        }}
        isUpdate={true}
        size="lg"
        content={
          <>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Select Stream</label>
                <select className="form-select py-2" name="stream" value={formData.stream} onChange={handleChange}>
                  <option value="">Choose Stream</option>
                  {streams?.map((stream) => (
                    <option key={stream?._id} value={stream?._id}>{stream?.title}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Course Heading</label>
                <input type="text" className="form-control py-2" name="heading" value={formData.heading} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Course URL</label>
                <input type="text" className="form-control py-2" name="url" value={formData.url} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Short Name</label>
                <input type="text" className="form-control py-2" name="shortName" value={formData.shortName} onChange={handleChange} />
              </div>
            </div>
          </>
        }
        onConfirm={handleEditSubmit}
        title="Update Main Course"
        loading={loading}
      />
    </div>
  );
};

export default AddMainCourse;
