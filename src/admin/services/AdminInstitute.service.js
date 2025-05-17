import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_INSTITUTE = `${baseUrl}/api/institute/add`;
const UPDATE_INSTITUTE = `${baseUrl}/api/institute/update`;
const VIEW_INSTITUTE = `${baseUrl}/api/institute/view`;
const GET_SINGLE_INSTITUTE = `${baseUrl}/api/institute/`;
const DELETE_INSTITUTE = `${baseUrl}/api/institute/delete/`;

export const addInstitute = async (data) => {
  return axios.post(`${ADD_INSTITUTE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateInstitute = async (data) => {
  return axios.put(`${UPDATE_INSTITUTE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getInstitute = async (page = 1, filters) => {
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
  if (filters?.role) {
    params.append("role", filters.role);
  }

  return axios.get(`${VIEW_INSTITUTE}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSingleInstitute = async (id) => {
  return axios.get(`${GET_SINGLE_INSTITUTE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteInstitute = async (id) => {
  return axios.delete(`${DELETE_INSTITUTE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};