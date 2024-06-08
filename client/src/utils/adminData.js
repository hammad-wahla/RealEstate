import axios from "axios";
const BASE_URL = "http://localhost:5000";
const API_URL = "/api/admin";

export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL + API_URL}/login`,
      { username, password },
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    throw new Error("Invalid username or password");
  }
};

export const adminLogout = async () => {
  try {
    await axios.post(
      `${BASE_URL + API_URL}/logout`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    throw new Error("Error logging out");
  }
};

export const checkAdminAuth = async () => {
  try {
    const response = await axios.get(`${BASE_URL + API_URL}/dashboard`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (err) {
    return false;
  }
};
