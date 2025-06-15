import React, { useEffect, useState } from "react";
import { Container, Row, Breadcrumb, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getTopUpRequests,
  updateTopUpRequest,
} from "../services/AdminTopUp.service";

const AdminTopUpRequests = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getTopUpRequests();
    if (response.data.status) {
      setTableData(response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  function getFormattedDate(date) {
    const today = new Date(date);
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  const handleStatus = async (id, status) => {
    // Call the API to add the top-up request
    await updateTopUpRequest(id, { status }).then((res) => {
      if (res?.data?.status) {
        // Reset form data on success
        fetchData();
        toast.success("Updated Successfully");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>All Transactions</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="mt-4 rounded">
        <Row>
          <div className="table-responsive border p-0 rounded">
            <Table hover responsive className="align-middle mb-0">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="ps-4 py-3 bg-dark text-white">Wallet Id</th>
                  <th className="py-3 bg-dark text-white">Amount</th>
                  <th className="py-3 bg-dark text-white">Payment Method</th>
                  <th className="py-3 bg-dark text-white">Txn Date</th>
                  <th className="py-3 bg-dark text-white">Tx Id</th>
                  <th className="py-3 bg-dark text-white">Description</th>
                  <th className="py-3 bg-dark text-white"></th>
                </tr>
              </thead>
              {!dataLoading ? (
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((data, index) => (
                      <tr key={data._id}>
                        <td className="ps-4 py-3">{data?.walletId}</td>
                        <td>{data?.amount}</td>
                        <td>{data?.method}</td>
                        <td>{getFormattedDate(data?.date)}</td>
                        <td>{data?.transactionId}</td>
                        <td>{data?.description}</td>
                        <td>
                          <div className="d-flex gap-3 flex-wrap">
                            <button className="btn btn-success" onClick={()=>handleStatus(data?._id , "accept")}>Accept</button>
                            <button className="btn btn-danger" onClick={()=>handleStatus(data?._id , "decline")}>Decline</button>
                          </div>
                        </td>
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

export default AdminTopUpRequests;
