import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_SUB_COURSE = `${baseUrl}/api/subCourse/add`;
const UPDATE_COURSE = `${baseUrl}/api/subCourse/update`;
const VIEW_SUB_COURSE = `${baseUrl}/api/subCourse/view`;
const VIEW_SINGLE_SUB_COURSE = `${baseUrl}/api/subCourse/single`;
const DELETE_SUB_COURSE = `${baseUrl}/api/subCourse/delete/`;

export const addSubCourse = async (data) => {
  return axios.post(`${ADD_SUB_COURSE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateSubCourse = async (data) => {
  return axios.put(`${UPDATE_COURSE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSubCourses = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_SUB_COURSE}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteSubCourse = async (id) => {
  return axios.delete(`${DELETE_SUB_COURSE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSubCourseById = async (id) => {
  return axios.get(`${VIEW_SUB_COURSE}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getsubCourseById = async (id) => {
  return axios.get(`${VIEW_SINGLE_SUB_COURSE}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
