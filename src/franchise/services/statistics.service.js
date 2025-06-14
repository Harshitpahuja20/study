import axios from "axios";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const GET_ADMIN_STATISTICS = `${baseUrl}/api/statistics/franchise`;

export const getFranchiseStatistics = async () => {
  return axios.get(`${GET_ADMIN_STATISTICS}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};
