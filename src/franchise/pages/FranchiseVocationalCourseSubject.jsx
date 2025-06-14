import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Breadcrumb,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addsubject,
  deletesubject,
  getsubjects,
  updatesubject,
} from "../services/FranchiseSubjects.service";
import AddModal from "../../admin/components/popup/AddModal";
import DeleteModal from "../../admin/components/popup/DeleteModal";

const FranchiseSubjectForm = () => {
  const location = useLocation();
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getsubjects(location.state.id);
    if (response.data.status) {
      setTableData(response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Subject</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="bg-light p-4 rounded">
        <Row>
          <h6 className="text-uppercase mb-0">{location.state.name}</h6>
        </Row>
      </Container>

      <Container className="mt-4 rounded">
        <Row>
          <div className="table-responsive border p-0 rounded">
            <Table hover responsive className="align-middle mb-0">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                  <th className="py-3 bg-dark text-white">Subject Name</th>
                  <th className="py-3 bg-dark text-white">Practical Min</th>
                  <th className="py-3 bg-dark text-white">Theory Min</th>
                  <th className="py-3 bg-dark text-white">Practical Max</th>
                  <th className="py-3 bg-dark text-white">Theory Max</th>
                </tr>
              </thead>
              {!dataLoading ? (
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((data, index) => (
                      <tr key={data._id}>
                        <td className="ps-4 py-3">{index + 1}</td>
                        <td>{data.subjectName}</td>
                        <td>{data.practicalMin}</td>
                        <td>{data.theoryMin}</td>
                        <td>{data.practicalMax}</td>
                        <td>{data.theoryMax}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-5">
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
      </Container>
    </>
  );
};

export default FranchiseSubjectForm;
