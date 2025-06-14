import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { FaWallet, FaFileAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getFranchiseTopUpStats } from "../services/franchiseTopup.service";

const FranchiseWallet = () => {
  const [stats, setStats] = useState({
    balance: 0,
    transactionsCount: 0,
  });

  useEffect(() => {
    getStatsWallet();
  }, []);

  const getStatsWallet = async () => {
    await getFranchiseTopUpStats().then((res) => {
      if (res?.data?.status) {
        setStats(res?.data?.data);
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  const cardStyle = {
    backgroundColor: "#f0f8ff", // Light background color
    color: "#333", // Dark text for contrast
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
  };

  const cardFooterStyle = {
    backgroundColor: "transparent",
    textAlign: "center",
    color: "#555", // Lighter text for footer
  };

  const buttonStyle = {
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "30px",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Button shadow
  };

  return (
    <div className="my-1 p-2">
      <Breadcrumb>
        <Breadcrumb.Item href="/franchise/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Wallet
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="row">
        {/* Wallet Balance Card */}
        <div className="col-md-6 mb-4">
          <div className="card" style={cardStyle}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title fw-bold">WALLET BALANCE</h5>
                <p className="card-text fs-3">₹ {stats?.balance || 0}</p>
              </div>
              <div>
                <FaWallet size={40} />
              </div>
            </div>
            <div className="card-footer" style={cardFooterStyle}>
              Amount Balance In Wallet
            </div>
          </div>
        </div>

        {/* Total Transitions Card */}
        <div className="col-md-6 mb-4">
          <div className="card" style={cardStyle}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title fw-bold">TOTAL TRANSITIONS</h5>
                <p className="card-text fs-3">{stats?.transactionsCount || 0}</p>
              </div>
              <div>
                <FaFileAlt size={40} />
              </div>
            </div>
            <div className="card-footer" style={cardFooterStyle}>
              Total Wallet Transitions
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Topup Button */}
      <div className="text-center mt-4">
        <button style={buttonStyle}>
          <i className="fas fa-plus-circle me-2"></i> Wallet Topup
        </button>
      </div>
    </div>
  );
};

export default FranchiseWallet;
