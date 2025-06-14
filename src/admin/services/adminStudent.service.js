import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_STUDENT = `${baseUrl}/api/student/add`;
const ADD_MARKS = `${baseUrl}/api/student/addMarks`;
const UPDATE_MARKS = `${baseUrl}/api/student/updateMarks`;
const UPDATE_STUDENT = `${baseUrl}/api/student/update`;
const VIEW_STUDENT = `${baseUrl}/api/student/view`;
const VIEW_STUDENT_FOR_RESULT = `${baseUrl}/api/student/view/getStudentsForResults`;
const DELETE_STUDENT = `${baseUrl}/api/student/delete/`;
const GET_SINGLE_STUDENT = `${baseUrl}/api/student/view/`;

export const addStudents = async (data) => {
  return axios.post(`${ADD_STUDENT}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateStudents = async (data) => {
  return axios.put(`${UPDATE_STUDENT}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getStudentsForResults = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_STUDENT_FOR_RESULT}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
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
  if (filters?.userId) {
    params.append("userId", filters.userId);
  }

  return axios.get(`${VIEW_STUDENT}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSingleStudent = async (id) => {
  return axios.get(`${GET_SINGLE_STUDENT}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteStudent = async (id) => {
  return axios.delete(`${DELETE_STUDENT}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const addStudentMarks = async (data) => {
  return axios.post(`${ADD_MARKS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateStudentMarks = async (data) => {
  return axios.put(`${UPDATE_MARKS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
