import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button, Form, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../components/popup/DeleteModal";
import { toast } from "react-toastify";
import { deleteStudentQueries, getStudentQueries } from "../services/adminContactQueries.service";

const AdminStudentRequests = () => {
  const [studentFilter, setStudentFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    status: "",
  });

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getStudentQueries(page, filters);
    if (response.data.status) {
      setDataLoading(false);
      setTableData(response.data.data);
      setFilteredData(response.data.data); // Initially set filtered data to all data
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
      if (selectedId) {
        await deleteStudentQueries(selectedId).then((response) => {
          if (response.data.status) {
            toast.success("Deleted Successfully");
            fetchData(pagination.currentPage);
            setIsDeletePopup(false);
            setSelectedId("");
          } else {
            toast.error(response.data.message);
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSearchChange = (e) => {
    setStudentFilter(e.target.value);
    // Filter the data based on the name
    if (e.target.value === "") {
      setFilteredData(tableData); // If filter is empty, show all data
    } else {
      const filtered = tableData.filter((student) =>
        student.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Student Requests
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={4}>
          <Form.Group controlId="instituteName" className="mb-3">
            <Form.Label className="small fw-semibold">Search by student name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              name="instituteName"
              value={studentFilter}
              onChange={handleSearchChange}
              className="p-2"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Name</th>
                <th className="py-3 bg-dark text-white">Phone</th>
                <th className="py-3 bg-dark text-white">Course</th>
                <th className="py-3 bg-dark text-white">Subject</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4 py-3">{index + 1}</td>
                      <td className=" py-3">{data?.fullName}</td>
                      <td className=" py-3">{data?.phoneNumber}</td>
                      <td className=" py-3">{data?.courseName}</td>
                      <td className=" py-3">{data?.subjectName}</td>
                      <td className="text-center py-3">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setSelectedId(data?._id);
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
                    <td colSpan={7} className="text-center py-5 fs-6">
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

      <DeleteModal
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
          setSelectedId("");
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminStudentRequests;
