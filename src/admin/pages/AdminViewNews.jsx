import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button, Form } from "react-bootstrap";
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

const AdminViewNews = () => {
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
    title: "",
    shortDescription: "",
    description: "", // To store editor content
  });

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getNews(page);
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
        await deleteNews(selectedData?._id).then((response) => {
          setLoading(false);
          if (response.data.status) {
            toast.success(response.data.message);
            fetchData(pagination.currentPage);
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

  const handleUpdateNews = async (e) => {
    e.preventDefault();

    if (!formData.title) return toast.warning("News Heading is required!");
    if (!formData.shortDescription)
      return toast.warning("Short Description is required!");
    if (!formData.description) return toast.warning("Description is required");

    try {
      setLoading(true);

      const updateData = {
        heading: formData.title,
        shortDescription: formData.shortDescription,
        description: formData.description,
        id: selectedData._id,
      };

      const response = await updateNews(updateData);
      setLoading(false);
      if (response.data.status) {
        toast.success("Updated Successfully");
        fetchData(pagination.currentPage);
        setIsEditPopup(false);
        setSelectedData(null);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(`err : ${err?.message}`);
    }
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setFormData({
      title: data.heading,
      shortDescription: data.shortDescription,
      description: data.description,
    });
    setIsEditPopup(true);
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          View News
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Heading</th>
                <th className="py-3 bg-dark text-white">Created At</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className="py-3">{data?.heading}</td>
                      <td className="py-3">
                        {new Date(data?.createdAt).toLocaleDateString()}
                      </td>
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
            <Form onSubmit={handleUpdateNews}>
              <Form.Group>
                <Form.Label className="fw-semibold">News Heading</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter News Heading"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-semibold">
                  Short Description
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  placeholder="Enter Short Description"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-semibold">Description</Form.Label>
                <QuillEditor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                />
              </Form.Group>
            </Form>
          </>
        }
        onConfirm={handleUpdateNews}
        title="Update News"
        loading={loading}
      />
    </div>
  );
};

export default AdminViewNews;
