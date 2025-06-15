import { useEffect, useState } from "react";
import { Breadcrumb, Row, Spinner, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getTopUpRequestsByFranchise } from "../services/AdminTopUp.service";
import { useNavigate } from "react-router-dom";

const AdminWallet = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchData = async (page = 1) => {
    setDataLoading(true);
    try {
      const response = await getTopUpRequestsByFranchise();
      if (response.data.status) {
        setTableData(response.data.data);
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
                <th className="ps-4 bg-dark text-white py-3 ">Wallet Id</th>
                <th className="bg-dark text-white py-3 ">Center Code</th>
                <th className="bg-dark text-white py-3 ">Center Name</th>
                <th className="bg-dark text-white py-3 ">
                  Wallet Balance ( Rs. )
                </th>
                <th className="bg-dark text-white py-3 ">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {!dataLoading ? (
                tableData.length ? (
                  tableData.map((data, index) => (
                    <tr key={data._id}>
                      <td className="ps-4">{data?.userName}</td>
                      <td>{data?.franchiseCode}</td>
                      <td>{data?.franchiseName}</td>
                      <td>{data?.balance}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-start gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              navigate(`/admin/wallet/topup?id=${data?._id}&wallet=${data?.userName}`);
                            }}
                          >
                            Top Up
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

export default AdminWallet;
