import axios from "axios";
import { getFranchiseAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const VIEW_VOCATIONAL_COURSE = `${baseUrl}/api/vocationalCourse/view`;

export const getFranchisevocationalCourses = async () => {
  return axios.get(`${VIEW_VOCATIONAL_COURSE}`, {
    headers: {
      Authorization: getFranchiseAuth()?.token,
    },
  });
};
