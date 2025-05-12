import React, { useRef, useState } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  Spinner,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import BrokenImage from "../../assets/image/png/broken-image.png";
import mediaPicker from "../../assets/image/png/media-picker.png";
import AddModal from "../components/popup/AddModal";
import DeleteModal from "../components/popup/DeleteModal";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";

const AdminStreams = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedId, setSelectedId] = useState("");
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isAddPopup, setIsAddPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const imageRef = useRef();

  function getFormattedDate(isoString) {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate is zero-based
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleDelete = async () => {
    // try {
    //   if (selectedId) {
    //     await deleteCleaningtype(selectedId).then((response) => {
    //       if (response.data.status) {
    //         toast.success(response.data.message);
    //         fetchData({
    //           page: pagination.currentPage,
    //         });
    //         setIsDeletePopup(false);
    //         setSelectedId("");
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong!");
    // }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setFile(file);
    }
  };

  const handleAddCleaningType = async () => {
    // try {
    //   if (!title) return toast.warning("Title is required!");
    //   if (!key) return toast.warning("Key is required!");
    //   if (!file) return toast.warning("Icon is required!");
    //   setIsLoading(true);
    //   const formData = new FormData();
    //   formData.append("title", title);
    //   formData.append("key", key);
    //   formData.append("icon", file);
    //   await addCleaningtype(formData).then((res) => {
    //     if (res.data.status) {
    //       toast.success("Added Successfully");
    //       setIsLoading(false);
    //       fetchData({ page: pagination.currentPage });
    //       setIsAddPopup(false);
    //       setTitle("");
    //       setFile(null);
    //     } else {
    //       toast.error(res.data.message);
    //       setIsLoading(false);
    //     }
    //   });
    // } catch (error) {
    //   setIsLoading(false);
    //   toast.error("Something went wrong!");
    //   console.log(error?.message);
    // }
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Streams
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-3 justify-content-end">
        <Col xs="auto">
          <Button variant="danger" onClick={() => setIsAddPopup(true)}>
            Add
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Title</th>
                <th className="py-3 bg-dark text-white">Image</th>
                <th className="py-3 bg-dark text-white">Created At</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4">{index + 1}</td>
                      <td>{data?.title}</td>
                      <td>
                        <img
                          src={data?.image || BrokenImage}
                          alt="Image"
                          width="60"
                          height="60"
                          className="rounded"
                          style={{ objectFit: "cover", cursor: "pointer" }}
                        />
                      </td>
                      <td>{getFormattedDate(data?.createdAt)}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedId(data?._id);
                              setIsDeletePopup(true);
                            }}
                          >
                            🗑️
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setIsEditData(data);
                              setIsEditPopup(true);
                            }}
                          >
                            ✏️
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
              pageLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              previousClassName="page-item"
              previousLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              nextClassName="page-item"
              nextLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              breakClassName="page-item"
              breakLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              activeClassName="active bg-primary text-white"
            />
          )}
        </div>
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
        show={isAddPopup}
        handleClose={() => {
          setIsAddPopup(false);
          setTitle("");
          setFile(null);
        }}
        content={
          <>
            <input
              type="file"
              className="form-control d-none"
              placeholder="Add title"
              ref={imageRef}
              onChange={handleFileChange}
            />
            <div>
              <div className="w-100">
                <div
                  style={{ width: "200px" }}
                  className="mx-auto position-relative"
                >
                  {file ? (
                    <>
                      {" "}
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected Image"
                        className="img-thumbnail mx-auto d-block mb-4"
                        width={"200px"}
                      />
                      <span
                        className="badge bg-transparent position-absolute top-0 end-0 cursor-pointer"
                        onClick={() => setFile(null)}
                      >
                        <IoIosCloseCircle className="fs-3 text-danger cursor-pointer" />
                      </span>
                    </>
                  ) : (
                    <img
                      src={mediaPicker}
                      alt="MediaPicker"
                      onClick={() => {
                        imageRef.current.click();
                      }}
                      className="img-thumbnail mx-auto d-block mb-4 cursor-pointer"
                      width={"200px"}
                    />
                  )}
                </div>
              </div>
            </div>

            <Form.Control
              type="text"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 px-4 border-1 customInput rounded-2 w-100"
            />
          </>
        }
        onConfirm={() => handleAddCleaningType()}
        title="Add New Stream"
        loading={loading}
      />

      {/* <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setIsEditData(null);
          setFile(null);
        }}
        isUpdate={true}
        content={
          <>
            <input
              type="file"
              className="form-control d-none"
              placeholder="Add title"
              ref={imageRef}
              onChange={handleFileChange}
            />
            <div>
              <div className="w-100">
                <div
                  style={{ width: "200px" }}
                  className="mx-auto position-relative"
                >
                  {file ? (
                    <>
                      {" "}
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected Image"
                        className="img-thumbnail mx-auto d-block mb-5"
                        width={"200px"}
                      />
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="btn btn-sm bg-danger position-absolute rounded-circle p-0"
                        style={{
                          top: "-8px", // Push it a bit above the image
                          right: "-6px", // Push it a bit outside to the right
                          zIndex: 10,
                        }}
                      >
                        <KTIcon
                          iconName="cross"
                          className="fs-1 text-black p-0"
                        />
                      </button>
                    </>
                  ) : isEditData?.image ? (
                    <>
                      {" "}
                      <img
                        src={isEditData?.image}
                        alt="Selected Image"
                        className="img-thumbnail mx-auto d-block mb-5"
                        width={"200px"}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditData((prev: any) => ({ ...prev, image: "" }))
                        }
                        className="btn btn-sm bg-danger position-absolute rounded-circle p-0"
                        style={{
                          top: "-8px", // Push it a bit above the image
                          right: "-6px", // Push it a bit outside to the right
                          zIndex: 10,
                        }}
                      >
                        <KTIcon
                          iconName="cross"
                          className="fs-1 text-black p-0"
                        />
                      </button>
                    </>
                  ) : (
                    <img
                      src={mediaPicker}
                      alt="MediaPicker"
                      onClick={() => {
                        imageRef.current.click();
                      }}
                      className="img-thumbnail mx-auto d-block mb-5 cursor-pointer"
                      width={"200px"}
                    />
                  )}
                </div>
              </div>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Add title"
              value={isEditData?.title}
              onChange={(e) => {
                setIsEditData((prev: any) => ({
                  ...prev,
                  title: e.target?.value,
                }));
              }}
            />
          </>
        }
        onConfirm={() => handleUpdateCleaningType()}
        title="Update Type"
        loading={loading}
      /> */}
    </div>
  );
};

export default AdminStreams;
