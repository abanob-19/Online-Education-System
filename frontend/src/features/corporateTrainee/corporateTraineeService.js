import axios from "axios";

const API_URL = "/corporateTrainee/";

// Adding an admin
const viewAllCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "viewAllCourses", config);
  return response.data;
};

const getRegisteredCourses = async (registeredIDs, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "viewAllRegisterdCourses",
    registeredIDs,
    config
  );
  return response.data;
};

const setSolvingExam = async (courseAndExamID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "getCourse",
    courseAndExamID,
    config
  );
  return response.data;
};

const registerCourse = async (courseAndUserIDs, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "registerCourse",
    courseAndUserIDs,
    config
  );
  return response.data;
};

const answerExam = async (answerList, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "answerExam", answerList, config);
  return response.data;
};

const getsolvedExams = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getsolvedExams", config);
  return response.data;
};

const viewPrevExam = async (answers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return answers;
  // const response = await axios.put(API_URL+'home',number,config)
  // return response.data
};

const viewAllCoursesFiltered = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "filterCourses", x, config);
  return response.data;
};

const openCourse = async (courseAndUserIDs, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "openCourse",
    courseAndUserIDs,
    config
  );
  return response.data;
};

const viewMyRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "viewMyRequests", config);
  return response.data;
};

const requestCourse = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "requestCourse", x, config);
  return response.data;
};

const rateCourses = async (course_id, rating, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "rateCourses",
    course_id,
    rating,
    config
  );
  return response.data;
};

const rateInstructors = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "rateInstructor", x, config);
  return response.data;
};

const reviewCourses = async (rev, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "reviewCourse", rev, config);
  return response.data;
};

const reviewInstructors = async (rev, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "reviewInstructor", rev, config);
  return response.data;
};

const setReviewCourse = async (course_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "getReviewCourse",
    course_id,
    config
  );
  console.log(response);
  return response.data;
};

const setReviewInstructor = async (Instructor_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "getReviewInstructor",
    Instructor_id,
    config
  );
  console.log(response);
  return response.data;
};

const acceptPolicy = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "acceptPolicy", x, config);
  return response.data;
};
const reportProblem = async (course,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL+'/reportAproblem',course,config)
  return response.data
}
const viewProblem = async (course,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL+'/viewProblem',course,config)
  return response.data
}
const followUpProblem = async (course,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL+'/followUp',course,config)
  return response.data
}

const getfirstName = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  

  const response = await axios.get(API_URL+'getfirstName',config)
  return response.data
}
const getlastName = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  

  const response = await axios.get(API_URL+'getlastName',config)
  return response.data
}

const sendEmail = async (cname,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
      await axios.put(API_URL+'sendEmail',cname,config)
    // return response.data
}


const corporateTraineeService = {
  viewAllCourses,
  registerCourse,
  getRegisteredCourses,
  setSolvingExam,
  answerExam,
  getsolvedExams,
  viewPrevExam,
  viewAllCoursesFiltered,
  openCourse,
  viewMyRequests,
  requestCourse,
  rateCourses,
  rateInstructors,
  reviewCourses,
  setReviewCourse,
  reviewInstructors,
  setReviewInstructor,
  acceptPolicy,
  getfirstName,
  getlastName,
  sendEmail,
  reportProblem,
  viewProblem,
  followUpProblem
};

export default corporateTraineeService;
