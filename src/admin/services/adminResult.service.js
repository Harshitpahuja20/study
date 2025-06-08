import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const UPDATE_RESULT = `${baseUrl}/api/result/update`;
const VIEW_RESULT = `${baseUrl}/api/admin/result/view`;
const DELETE_RESULT = `${baseUrl}/api/admin/result/delete/`;
const GET_SINGLE_RESULT = `${baseUrl}/api/admin/result/view/`;

export const updateresult = async (data) => {
  return axios.put(`${UPDATE_RESULT}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getresults = async () => {
  return axios.get(`${VIEW_RESULT}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSingleresult = async (id) => {
  return axios.get(`${GET_SINGLE_RESULT}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteresult = async (id) => {
  return axios.delete(`${DELETE_RESULT}${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};