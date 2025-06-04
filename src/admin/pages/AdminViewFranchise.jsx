import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { getFranchises } from "../services/adminFranchise.service";
import { useNavigate } from "react-router-dom";

const AdminViewFranchise = () => {
  const navigate = useNavigate();
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
    const response = await getFranchises(page, filters);
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

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          View Franchise
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Franchise Name</th>
                <th className="py-3 bg-dark text-white">Name</th>
                <th className="py-3 bg-dark text-white">Phone</th>
                <th className="py-3 bg-dark text-white">Email</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className=" py-3">{data?.franchiseName}</td>
                      <td className=" py-3">{data?.fullName}</td>
                      <td className=" py-3">{data?.phoneNumber}</td>
                      <td className=" py-3">{data?.email}</td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center">
                          <Button variant="" size="sm" onClick={()=>navigate(`/admin/franchise/view/${data?._id}`)}>
                            <FaEye />
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
    </div>
  );
};

export default AdminViewFranchise;
