import axios from "axios";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/add`;
const UPDATE_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/update`;
const VIEW_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/view`;
const VIEW_FRANCHISE_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/franchise/view`;
const DELETE_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/delete/`;

export const addvocationCourse = async (data) => {
  return axios.post(`${ADD_VOCATIONAL_COURSE}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const updatevocationCourse = async (data) => {
  return axios.put(`${UPDATE_VOCATIONAL_COURSE}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const getvocationCourses = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_VOCATIONAL_COURSE}?${params.toString()}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const getFranchisevocationalCourses = async () => {
  return axios.get(`${VIEW_FRANCHISE_VOCATIONAL_COURSE}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const deletevocationCourse = async (id) => {
  return axios.delete(`${DELETE_VOCATIONAL_COURSE}${id}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};
