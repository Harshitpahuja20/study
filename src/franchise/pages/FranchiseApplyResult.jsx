import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
  updateStudents,
  applyResult,
} from "../services/franchiseAddStudent.service";
import { getFranchisevocationalCourses } from "../services/franchiseVocationalCourse.service";
import AddModal from "../../admin/components/popup/AddModal";
import DeleteModal from "../../admin/components/popup/DeleteModal";

const FranchiseApplyResult = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1) => {
    setDataLoading(true);
    try {
      const response = await getStudents(page , {type : "pending"});
      if (response.data.status) {
        setTableData(response.data.data);
        setPagination((prev) => ({
          ...prev,
          totalPages: response.data.data.totalPages,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Error fetching students.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleEditSubmit = async (id) => {
    setLoading(true);
    try {
      const res = await applyResult({id});
      console.log(res.data.status)
      if (res.data.status) {
        toast.success("Result Applied");
        fetchData(pagination.currentPage);
      } else {
        toast.error(res?.data?.message || "Failed to apply result");
      }
    } catch (err) {
      toast.error("Error applying result");
    } finally {
      setLoading(false);
    }
  };

  const formatDOBForInput = (dobString) => {
    if (!dobString) return "";
    const date = new Date(dobString);
    return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/franchise/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Result
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="bg-dark text-white py-3 ">Image</th>
                <th className="bg-dark text-white py-3 ">Reg No</th>
                <th className="bg-dark text-white py-3 ">Student Name</th>
                <th className="bg-dark text-white py-3 ">Father Name</th>
                <th className="bg-dark text-white py-3 ">Date of Birth</th>
                <th className="bg-dark text-white py-3 ">CourseName</th>
                <th className="bg-dark text-white py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {!dataLoading ? (
                tableData.length ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td>
                        {data?.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${data?.image}`}
                            width={100}
                            height={100}
                            className="object-fit-cover"
                            alt="Student"
                          />
                        )}
                      </td>
                      <td>{data?.enrollmentId}</td>
                      <td>{data?.studentName}</td>
                      <td>{data?.fatherName}</td>
                      <td>{formatDOBForInput(data?.dob)}</td>{" "}
                      <td>{data?.vocationalCourse?.name}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              handleEditSubmit(data._id);
                            }}
                          >
                            Apply Result
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

export default FranchiseApplyResult;
