import axios from "axios";
import { getAuth } from "../../services/auth.service";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_SUBJECT = `${baseUrl}/api/subject/add`;
const UPDATE_SUBJECT = `${baseUrl}/api/subject/update`;
const VIEW_SUBJECT = `${baseUrl}/api/subject/view`;
const DELETE_SUBJECT = `${baseUrl}/api/subject/delete/`;

export const addsubject = async (data) => {
  return axios.post(`${ADD_SUBJECT}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const updatesubject = async (data) => {
  return axios.put(`${UPDATE_SUBJECT}`, data, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const getsubjects = async (id) => {
  return axios.get(`${VIEW_SUBJECT}/${id}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};

export const deletesubject = async (id) => {
  return axios.delete(`${DELETE_SUBJECT}${id}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};
