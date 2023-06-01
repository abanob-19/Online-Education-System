import axios from "axios";

const API_URL = "/instructor/";

// Adding an admin
// router.get('/viewMyCourses',protectInstructor, viewMyCourses)

const viewMyCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "viewMyCourses", config);
  return response.data;
};

const addExam = async (exam, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "addExam", exam, config);
  return response.data;
};

const editExam = async (exam, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "addExam", exam, config);
  return response.data;
};

const editPublicity = async (number, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "home", number, config);
  return response.data;
};

const editEmail = async (email, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "editEmail", email, config);
  return response.data;
};

const searchMyCourses = async (searchQuery, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "inssearchCourse",
    searchQuery,
    config
  );
  return response.data;
};

const editBio = async (biography, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "editBio", biography, config);
  return response.data;
};

const coursePromo = async (promotion, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "coursePromo", promotion, config);
  return response.data;
};
const deleteExam = async (exam, token) => {
  const config = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(
    API_URL + "deleteExam",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        courseID: exam.courseID,
        number: exam.number,
      },
    }

    // {
    //   data:{
    // courseID:exam.courseID,
    // number:exam.number,
    // }, headers:config}
  );
  return response.data;
};

const chooseCourse = async (course, token) => {
  const response = course;
  return response;
};

const viewAllCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "viewAllCourses", config);
  return response.data;
};

const viewMyCoursesFiltered = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "filterMyCourses", x, config);
  return response.data;
};

const viewAllCoursesFiltered = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //-----------
  const response = await axios.put(API_URL + "filterCourses", x, config);
  return response.data;
};

const viewReviews = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "viewMyCoursesRatingAndReviews",
    x,
    config
  );
  return response.data;
};

const acceptContract = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "accept", x, config);
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

const viewMyRating = async (x, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("HEREEEEEEEEEEEE");
  // console.log("TOKEN IS = " + token);
  // console.log(config.headers.Authorization);

  const response = await axios.get(API_URL + "viewMyRatingAndReviews", config);
  return response.data;
};

const addCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "addCourse", course, config);
  return response.data;
};
const addLinkToCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "addLinkToCourse", course, config);
  return response.data;
};

const addLinktoSubtitle = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "addLinktoSubtitle",
    course,
    config
  );
  return response.data;
};

const editPublicityCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "editPublicityCourse",
    course,
    config
  );
  return response.data;
};

const editCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "editCourse", course, config);
  return response.data;
};

const deleteCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "deleteCourse", course, config);
  return response.data;
};

const closeCourse = async (course, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "closeCourse", course, config);
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

const intructorService = {
  viewMyCourses,
  chooseCourse,
  addExam,
  deleteExam,
  editExam,
  editPublicity,
  viewAllCourses,
  viewMyCoursesFiltered,
  viewAllCoursesFiltered,
  viewReviews,
  viewMyRating,
  acceptContract,
  addLinkToCourse,
  addLinktoSubtitle,
  // viewCoursefromResults,
  addCourse,
  editPublicityCourse,
  editCourse,
  deleteCourse,
  closeCourse,
  acceptPolicy,
  editBio,
  editEmail,
  coursePromo,
  searchMyCourses,
  reportProblem,
  viewProblem,
  followUpProblem
};

export default intructorService;
