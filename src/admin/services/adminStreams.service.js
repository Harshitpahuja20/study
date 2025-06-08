import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_STREAM = `${baseUrl}/api/stream/create`;
const UPDATE_STREAM = `${baseUrl}/api/stream/update`;
const UPDATE_STREAM_ATTACHMENT = `${baseUrl}/api/stream/update/attachment`;
const VIEW_STREAM = `${baseUrl}/api/stream/view`;
const DELETE_STREAM = `${baseUrl}/api/stream/delete`;

export const addStream = async (data) => {
  return axios.post(`${ADD_STREAM}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getStreams = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_STREAM}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteStreams = async (id) => {
  return axios.delete(`${DELETE_STREAM}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateStream = async (data) => {
  return axios.put(`${UPDATE_STREAM}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateStreamAttachemnt = async (data) => {
  return axios.put(`${UPDATE_STREAM_ATTACHMENT}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
