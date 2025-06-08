import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Row, Spinner, Table } from "react-bootstrap";
import { getresults } from "../services/adminResult.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";

const AdminResults = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getresults();
      if (response.data.status) {
        setTableData(response.data.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Error fetching results.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard/other">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          All Results
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Image.</th>
                <th className="bg-dark text-white py-3 ">Student Detail</th>
                <th className="bg-dark text-white py-3 ">Course	</th>
                <th className="bg-dark text-white py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="small-text">
              {!dataLoading ? (
                tableData.length ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td>
                        {data?.studentId?.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${data?.studentId?.image}`}
                            width={100}
                            height={100}
                            className="object-fit-cover"
                            alt="Student"
                          />
                        )}
                      </td>
                      <td>
                        <strong>Name :</strong> {data?.studentId?.studentName}
                        <br />
                       <strong>EnrollmentId :</strong> {data?.studentId?.enrollmentId}
                      </td>
                      <td>
                      {data?.courseId?.name}
                        <br />
                       <strong>Course Code :</strong> {data?.courseId?.code}
                        <br />
                       <strong>Duration :</strong> {data?.courseId?.duration}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/results/${data._id}`)
                            }
                          >
                            <FaEye />
                          </Button>
                          
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      No Data Found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <Spinner animation="border" />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Row>
    </div>
  );
};

export default AdminResults;
