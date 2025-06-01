import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const VIEW_CONTACT_QUERIES = `${baseUrl}/api/contactQuery/view`;
const DELETE_CONTACT_QUERIES = `${baseUrl}/api/contactQuery/delete`;
const VIEW_STUDENT_QUERIES = `${baseUrl}/api/studentQuery/view`;
const DELETE_STUDENT_QUERIES = `${baseUrl}/api/studentQuery/delete`;

export const getContactQueries = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_CONTACT_QUERIES}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteContactQueries = async (id) => {
  return axios.delete(`${DELETE_CONTACT_QUERIES}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};


export const getStudentQueries = async (page = 1, filters) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", Infinity);

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

  return axios.get(`${VIEW_STUDENT_QUERIES}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteStudentQueries = async (id) => {
  return axios.delete(`${DELETE_STUDENT_QUERIES}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};