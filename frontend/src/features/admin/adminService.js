import axios from "axios";

const API_URL = "/admin/";

// Adding an admin
const addAdmin = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "addAdmin", userData, config);
  return response.data;
};

// Adding an instructor
const addInstructor = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "addInstructor",
    userData,
    config
  );
  return response.data;
};

// Adding an corporate Trainee
const addCorporateTrainee = async (userData, token) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "addCorporateTrainee",
    userData,
    config
  );
  return response.data;
};

const viewAllCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL+'viewAllCourses',config)
  return response.data
}

const viewAllCoursesFiltered = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'filterCourses',x,config)
  return response.data
} 


const setDiscountCourses = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'setDiscountCourses',x,config)
  return response.data
} 

const viewAllReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'viewAllReports',config)
  return response.data
} 

const viewUnseenReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'viewUnseenReports',config)
  return response.data
} 

const setStatus = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'setStatus',x,config)
  return response.data
} 

const viewRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'viewRequests',config)
  return response.data
} 

const rejectRefundRequest = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'rejectRefundRequest',x,config)
  return response.data
} 

const acceptRefundRequest = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'acceptRefundRequest',x,config)
  return response.data
} 

const viewCourseRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'viewCourseRequests',config)
  return response.data
} 

const courseRequestResponse = async (x,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+'courseRequestResponse',x,config)
  return response.data
} 

const adminService = {
  addAdmin,
  viewAllCourses,
  addInstructor,
  addCorporateTrainee,
  viewAllCoursesFiltered,
  setDiscountCourses,
  viewAllReports,
  viewUnseenReports,
  setStatus,
  viewRequests,
  rejectRefundRequest,
  acceptRefundRequest,
  viewCourseRequests,
  courseRequestResponse,
};

export default adminService;
