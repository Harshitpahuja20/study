import axios from "axios";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_STUDENT = `${baseUrl}/api/student/add`;
const UPDATE_STUDENT = `${baseUrl}/api/student/update`;
const APPLY_RESULT_STUDENT = `${baseUrl}/api/student/applyResult`;
const VIEW_STUDENT = `${baseUrl}/api/student/franchise/view`;
const DELETE_STUDENT = `${baseUrl}/api/student/delete/`;
const GET_SINGLE_STUDENT = `${baseUrl}/api/student/view/`;

export const addStudents = async (data) => {
  return axios.post(`${ADD_STUDENT}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const updateStudents = async (data) => {
  return axios.put(`${UPDATE_STUDENT}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const getStudents = async (page = 1, filters) => {
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
  if (filters?.type) {
    params.append("type", filters.type);
  }

  return axios.get(`${VIEW_STUDENT}?${params.toString()}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const getSingleStudent = async (id) => {
  return axios.get(`${GET_SINGLE_STUDENT}${id}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const deleteStudent = async (id) => {
  return axios.delete(`${DELETE_STUDENT}${id}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const applyResult = async (data) => {
  return axios.put(`${APPLY_RESULT_STUDENT}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};