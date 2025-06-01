import axios from "axios";
import { getAuth } from "./auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const STUDENT_VERIFICATION = `${baseUrl}/api/student/studentVerification`;

export const studentVerify = async (data) => {
  return axios.post(`${STUDENT_VERIFICATION}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
