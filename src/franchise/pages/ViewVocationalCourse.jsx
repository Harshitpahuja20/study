import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getFranchisevocationalCourses } from "../services/franchiseVocationalCourse.service";

const ViewFranchiseVocationalCourse = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [dataLoading, setDataLoading] = useState(false);

  const durations = [
    "45 DAYS",
    "1 MONTH",
    "3 MONTH",
    "6 MONTH",
    "1 YEAR",
    "2 YEAR",
    "3 YEAR",
    "4 YEAR",
  ];

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getFranchisevocationalCourses();
    if (response.data.status) {
      setTableData(response.data.data || []);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          All Vocational Courses
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Course Name</th>
                <th className="py-3 bg-dark text-white">Duration</th>
                <th className="py-3 bg-dark text-white">Amount</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className="py-3">{data.name}</td>
                      <td className="py-3">{data.duration}</td>
                      <td className="py-3">{data.amount}</td>  
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-5 fs-6">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    <Spinner animation="border" />
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              onPageChange={handlePageClick}
              pageCount={pagination.totalPages}
              forcePage={pagination.currentPage - 1}
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
          </div>
        )}
      </Row>

    </div>
  );
};

export default ViewFranchiseVocationalCourse;
