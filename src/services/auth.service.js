import axios from "axios";
const AUTH_LOCAL_STORAGE_KEY = "token";
const AUTH_LOCAL_STORAGE_KEY_FRANCHISE = "franchisetoken";
const baseUrl = process.env.REACT_APP_API_URL;

const LOGIN = `${baseUrl}/api/login`;
const UPDATE_PASSWORD = `${baseUrl}/api/updatePassword`;
const GET_CURRENT_USER = `${baseUrl}/api/getCurrentRole`;

export const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const token = lsValue;

    if (token) {
      // You can easily check auth_token expiration also
      return { token };
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

export const getFranchiseAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY_FRANCHISE);
  console.log(lsValue)
  if (!lsValue) {
    return;
  }

  try {
    const token = lsValue;

    if (token) {
      // You can easily check auth_token expiration also
      return { token };
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

export const login = async (data) => {
  return axios.post(`${LOGIN}`, data, {});
};

export const getCurrentUser = (token) => {
  return axios.get(`${GET_CURRENT_USER}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updatePassword = (data) => {
  return axios.post(`${UPDATE_PASSWORD}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
