import axios from "axios";

const API_URL = "/guest/";

// Adding an admin
const viewAllCourses = async () => {
  const response = await axios.get(API_URL + "viewAllCourses");
  return response.data;
};

const viewAllCoursesFiltered = async (x) => {
  const response = await axios.put(API_URL + "filterCourses", x);
  return response.data;
};

const guestService = {
  viewAllCourses,
  viewAllCoursesFiltered,
};

export default guestService;
