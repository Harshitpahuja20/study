import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_NEWS = `${baseUrl}/api/news/add`;
const UPDATE_NEWS = `${baseUrl}/api/news/update`;
const VIEW_NEWS = `${baseUrl}/api/news/view`;
const DELETE_NEWS = `${baseUrl}/api/news/delete`;

export const addNews = async (data) => {
  return axios.post(`${ADD_NEWS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateNews = async (data) => {
  return axios.post(`${UPDATE_NEWS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getNews = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_NEWS}?${params.toString()}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteNews = async (id) => {
    return axios.delete(`${DELETE_NEWS}/${id}`, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
  };