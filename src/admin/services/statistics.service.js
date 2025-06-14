import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const GET_ADMIN_STATISTICS = `${baseUrl}/api/statistics/admin`;
const GET_ADMIN_HOME_STATISTICS = `${baseUrl}/api/statistics/admin/home`;

export const getAdminStatistics = async () => {
  return axios.get(`${GET_ADMIN_STATISTICS}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getAdminHomeStatistics = async () => {
  return axios.get(`${GET_ADMIN_HOME_STATISTICS}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
