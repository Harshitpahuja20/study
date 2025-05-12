import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_PLACE = `${baseUrl}/api/place/create`;
const UPDATE_PLACE = `${baseUrl}/api/place/update`;
const VIEW_PLACE = `${baseUrl}/api/place/view`;
const DELETE_PLACE = `${baseUrl}/api/place/delete`;

export const addPlace = async (data) => {
  return axios.post(`${ADD_PLACE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getPlaces = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_PLACE}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deletePlace = async (id) => {
  return axios.delete(`${DELETE_PLACE}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updatePlace = async (data) => {
  return axios.put(`${UPDATE_PLACE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
