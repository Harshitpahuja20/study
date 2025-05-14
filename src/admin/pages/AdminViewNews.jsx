import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { getFranchises } from "../services/adminFranchise.service";
import { useNavigate } from "react-router-dom";
import { deleteNews, getNews } from "../services/adminNews.service";
import { FaPencil } from "react-icons/fa6";
import DeleteModal from "../components/popup/DeleteModal";
import AddModal from "../components/popup/AddModal";
import ViewModal from "../components/popup/ViewModal";

const AdminViewNews = () => {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    status: "",
  });

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

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getNews(page, filters);
    if (response.data.status) {
      setDataLoading(false);
      setTableData(response.data.data);
      setPagination({
        ...pagination,
        totalPages: response.data.data.totalPages,
      });
    } else {
      setDataLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedData?._id) {
        await deleteNews(selectedData?._id).then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            fetchData({
              page: pagination.currentPage,
            });
            setIsDeletePopup(false);
            setSelectedData(null);
          } else {
            toast.error(response.data.message);
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // const handleUpdateNews = async (e) => {
  //   e.preventDefault();

  //   if (!selectedData.title) return toast.warning("News Heading is required!");
  //   if (!formData.shortDescription)
  //     return toast.warning("Short Description is required!");
  //   if (!editorState.getCurrentContent().hasText())
  //     return toast.warning("Description is required");

  //   setLoading(true);

  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState);
  //   const htmlDescription = draftToHtml(rawContentState);

  //   const submissionData = {
  //     heading: formData.title,
  //     shortDescription: formData.shortDescription,
  //     description: htmlDescription,
  //   };

  //   await addNews(submissionData)
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.data.status) {
  //         toast.success("Added Successfully");
  //         setFormData({
  //           title: "",
  //           shortDescription: "",
  //         });
  //         setEditorState("");
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toast.error("Something went wrong!");
  //       console.log(`err : ${err?.message}`);
  //     });
  // };

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
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Heading</th>
                <th className="py-3 bg-dark text-white">Created At</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className=" py-3">{data?.heading}</td>
                      <td className=" py-3">
                        {getFormattedDate(data?.createdAt)}
                      </td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() =>{
                              setSelectedData(data)
                              setIsViewPopup(true)
                            }}
                          >
                            <FaEye />
                          </Button>
                          {/* <Button
                            variant=""
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/franchise/view/${data?._id}`)
                            }
                          >
                            <FaPencil />
                          </Button> */}
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
          setSelectedData(null);
        }}
        onConfirm={handleDelete}
      />

      <ViewModal
        show={isViewPopup}
        handleClose={() => {
          setIsViewPopup(false);
          setSelectedData(null);
        }}
        content={<>
        <div className="card p-2">
        <div className="fs-3 fw-bold">{selectedData?.heading}</div>
        <div className="fw-semibold fs-6">({selectedData?.shortDescription})</div>
        </div>
        <div className="p-2" dangerouslySetInnerHTML={{ __html : selectedData?.description}} />
        </>}
        size="lg"
        title={"News Article"}
        noSize
      />

      {/* <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setSelectedData(null);
        }}
        isUpdate={true}
        content={<></>}
        onConfirm={() => handleUpdateCleaningType()}
        title="Update Stream"
        loading={loading}
      /> */}
    </div>
  );
};

export default AdminViewNews;
