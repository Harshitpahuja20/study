import axios from "axios";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

// API Routes
const ADD_TOP_UP_REQUEST = `${baseUrl}/api/topupRequest/add`;
const VIEW_TOP_UP_REQUEST_FRANCHISE = `${baseUrl}/api/topupRequest/view/franchise`;
const VIEW_TOP_UP_REQUEST_ADMIN = `${baseUrl}/api/topupRequest/view/admin`;
const UPDATE_TOP_UP_STATUS = `${baseUrl}/api/topupRequest/update`;
const GET_FRANCHISE_STATS = `${baseUrl}/api/topupRequest/stats`;
const GET_FRANCHISE_WALLET_TRANSACTIONS = `${baseUrl}/api/topupRequest/getAllTransactions`;

export const addTopUpRequest = async (data) => {
  try {
    const response = await axios.post(ADD_TOP_UP_REQUEST, data, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding Top-Up request:", error);
  }
};

export const updateTopUpStatus = async (data) => {
  try {
    const response = await axios.put(UPDATE_TOP_UP_STATUS, data, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating Top-Up status:", error);
  }
};

export const getTopUpRequestsByFranchise = async () => {
  try {
    const response = await axios.get(VIEW_TOP_UP_REQUEST_FRANCHISE, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Top-Up requests for franchise:", error);
  }
};

export const getAllTopUpRequests = async () => {
  try {
    const response = await axios.get(VIEW_TOP_UP_REQUEST_ADMIN, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching all Top-Up requests (admin):", error);
  }
};

export const getFranchiseTopUpStats = async () => {
  try {
    const response = await axios.get(GET_FRANCHISE_STATS, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching franchise stats:", error);
  }
};

export const getWalletTransactions = async () => {
  try {
    const response = await axios.get(GET_FRANCHISE_WALLET_TRANSACTIONS, {
      headers: {
        Authorization: getFranchiseAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching all Top-Up requests (admin):", error);
  }
};
