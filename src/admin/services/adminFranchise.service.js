import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_FRANCHISE = `${baseUrl}/api/franchise/add`;
const UPDATE_FRANCHISE = `${baseUrl}/api/franchise/update`;
const VIEW_FRANCHISE = `${baseUrl}/api/franchise/view`;
const GET_SINGLE_FRANCHISE = `${baseUrl}/api/franchise/`;
const DELETE_FRANCHISE = `${baseUrl}/api/franchise/`;
const ADD_BALANCE = `${baseUrl}/api/franchise/addBalance`;

export const addFranchise = async (data) => {
  return axios.post(`${ADD_FRANCHISE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateFranchise = async (data) => {
  return axios.put(`${UPDATE_FRANCHISE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const addBalance = async (data) => {
  return axios.put(`${ADD_BALANCE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getFranchises = async (page = 1, filters) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", "10");

  const [startDate, endDate] = filters?.dateRange || [];

  if (startDate) {
    params.append("start_date", startDate.toISOString());
  }
  if (endDate) {
    params.append("end_date", endDate.toISOString());
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }
  if (filters?.userId) {
    params.append("userId", filters.userId);
  }

  return axios.get(`${VIEW_FRANCHISE}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSingleFranchise = async (id) => {
  return axios.get(`${GET_SINGLE_FRANCHISE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteFranchise = async (id) => {
  return axios.delete(`${DELETE_FRANCHISE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};