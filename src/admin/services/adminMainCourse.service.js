import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_MAIN_COURSE = `${baseUrl}/api/mainCourse/add`;
const UPDATE_COURSE = `${baseUrl}/api/mainCourse/update`;
const VIEW_MAIN_COURSE = `${baseUrl}/api/mainCourse/view`;
const DELETE_MAIN_COURSE = `${baseUrl}/api/mainCourse/delete/`;

export const addMainCourse = async (data) => {
  return axios.post(`${ADD_MAIN_COURSE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateMainCourse = async (data) => {
  return axios.put(`${UPDATE_COURSE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};


export const getMainCourses = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_MAIN_COURSE}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteMainCourse = async (id) => {
  return axios.delete(`${DELETE_MAIN_COURSE}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
