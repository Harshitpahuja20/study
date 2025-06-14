import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useStudy } from "../../context/study.context";
import { addTopUpRequest } from "../services/franchiseTopup.service";
import { toast } from "react-toastify";

const FranchiseWalletTopUp = () => {
  const { currentUser } = useStudy();

  const [formData, setFormData] = useState({
    walletId: currentUser?.userName,
    amount: "",
    method: "Joining Topup",
    date: "",
    transactionId: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are present and non-empty
    const { walletId, amount, method, date, transactionId, description } = formData;
    if (!walletId || !amount || !method || !date || !transactionId || !description) {
      toast.error("All fields are required!");
      return;
    }

    // Call the API to add the top-up request
    await addTopUpRequest(formData).then((res) => {
      if (res?.data?.status) {
        // Reset form data on success
        setFormData({
          walletId: currentUser?.franchiseCode,
          amount: "",
          method: "Joining Topup",
          date: "",
          transactionId: "",
          description: "",
        });
        toast.success("Top-up request submitted successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="my-2">
      <Breadcrumb>
        <Breadcrumb.Item href="/franchise/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Wallet TopUp
        </Breadcrumb.Item>
      </Breadcrumb>

      <form onSubmit={handleSubmit} className="bg-light py-4 px-3 rounded">
        {/* Wallet ID */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="walletId">
            Wallet Id
          </label>
          <input
            type="text"
            className="form-control py-2"
            id="walletId"
            name="walletId"
            value={formData.walletId}
            placeholder="Wallet Id"
            required
            disabled
          />
        </div>

        {/* Amount */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            className="form-control py-2"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Recharge Amount"
            required
          />
        </div>

        {/* Payment Method */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="method">
            Payment Method
          </label>
          <select
            className="form-control py-2"
            id="method"
            name="method"
            value={formData.method}
            onChange={handleChange}
            required
          >
            <option value="Joining Topup">Joining Topup</option>
            <option value="Cash">Cash</option>
            <option value="Wallet Transfer">
              Wallet Transfer (UPI, Paytm, Gpay, PhonePe)
            </option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        {/* Transaction Date */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="date">
            Transaction Date
          </label>
          <input
            type="date"
            className="form-control py-2"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Transaction ID */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="transactionId">
            Transaction Id
          </label>
          <input
            type="text"
            className="form-control py-2"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="Transaction Id"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group mb-2">
          <label className="fw-semibold small-text mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control py-2"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-group text-center mt-4">
          <button type="submit" className="btn btn-primary px-4 py-2">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FranchiseWalletTopUp;
