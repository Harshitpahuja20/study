import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

// API Routes
const ADD_TOP_UP_REQUEST = `${baseUrl}/api/topupRequest/adminAddTopUpRequest`;
const UPDATE_TOP_UP_REQUEST = `${baseUrl}/api/topupRequest/update`;
const GET_FRANCHISE_FOR_TOPUP = `${baseUrl}/api/topupRequest/getFranchisesForTopUp`;
const GET_TOPUP_REQUESTS = `${baseUrl}/api/topupRequest/view/admin`;

export const addTopUpRequest = async (data) => {
  try {
    const response = await axios.post(ADD_TOP_UP_REQUEST, data, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding Top-Up request:", error);
  }
};

export const updateTopUpRequest = async (id , data) => {
  try {
    const response = await axios.put(`${UPDATE_TOP_UP_REQUEST}/${id}`, data, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding Top-Up request:", error);
  }
};

export const getTopUpRequestsByFranchise = async () => {
  try {
    const response = await axios.get(GET_FRANCHISE_FOR_TOPUP, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Top-Up requests for franchise:", error);
  }
};

export const getTopUpRequests = async () => {
  try {
    const response = await axios.get(GET_TOPUP_REQUESTS, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Top-Up requests for franchise:", error);
  }
};
