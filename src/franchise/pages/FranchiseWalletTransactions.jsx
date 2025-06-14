import React, { useEffect, useState } from "react";
import { Container, Row, Breadcrumb, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { getWalletTransactions } from "../services/franchiseTopup.service";

const FranchiseWalletTransactions = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    const response = await getWalletTransactions();
    if (response.data.status) {
      setTableData(response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
    setDataLoading(false);
  };

  function getFormattedDate(date) {
      const today = new Date(date);
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

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
                  <th className="ps-4 py-3 bg-dark text-white">Tx Id</th>
                  <th className="py-3 bg-dark text-white">Enrollment No.</th>
                  <th className="py-3 bg-dark text-white">Name</th>
                  <th className="py-3 bg-dark text-white">Father Name</th>
                  <th className="py-3 bg-dark text-white">Date Of Birth</th>
                  <th className="py-3 bg-dark text-white">Course Name</th>
                  <th className="py-3 bg-dark text-white">Fee</th>
                </tr>
              </thead>
              {!dataLoading ? (
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((data, index) => (
                      <tr key={data._id}>
                        <td className="ps-4 py-3">{data?.transactionId}</td>
                        <td>{data?.enrollmentId}</td>
                        <td>{data?.name}</td>
                        <td>{data?.fatherName}</td>
                        <td>{getFormattedDate(data?.dob)}</td>
                        <td>{data?.course}</td>
                        <td>{data?.fee}</td>
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

export default FranchiseWalletTransactions;
