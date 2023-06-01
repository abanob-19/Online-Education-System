import axios from "axios";

const API_URL = "/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const forgot = async (email) => {
  const response = await axios.post(API_URL + "password-reset", email);

  return response.data;
};

const change = async (data) => {
  const response = await axios.post(
    API_URL + "password-reset/" + data.id + "/" + data.token,
    { password: data.password }
  ); //to adjust the route of the backend

  return response.data;
};

const searchAllCourses = async (searchQuery, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "searchCourse",
    searchQuery,
    config
  );
  return response.data;
};

const selectCountry = async (_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "selectCountry", _id, config);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateUserInfo = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "updateUserInfo",
    userData,
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};


const setOnboarding = () => {
  return true;
};

const authService = {
  register,
  logout,
  login,
  updateUserInfo,
  forgot,
  change,
  selectCountry,
  searchAllCourses,
  setOnboarding,
};

export default authService;
