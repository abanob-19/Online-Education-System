import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import individualTraineeService from "./individualTraineeService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  courses: [],
  registeredCourses: [],
  solvingExam: "",
  solvedExams: "",
  answers: "",
  reviewingCourse: null,
  reviewingInstructor: null,
  firstName:'',
  lastName:'',
  problem:[]
};

// Adding admin
export const viewAllCourses = createAsyncThunk(
  "individualTrainee/viewAllCourses",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.viewAllCourses(token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getsolvedExams = createAsyncThunk(
  "individualTrainee/getsolvedExams",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.getsolvedExams(token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRegisteredCourses = createAsyncThunk(
  "individualTrainee/getRegisteredCourses",
  async (registeredIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.getRegisteredCourses(
        registeredIDs,
        token
      );
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const previewCourses = createAsyncThunk(
  "individualTrainee/coursePreview",
  async (course_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.previewCourses(course_id, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerCourse = createAsyncThunk(
  "individualTrainee/registerCourse",
  async (courseAndUserIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.registerCourse(
        courseAndUserIDs,
        token
      );
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setSolvingExam = createAsyncThunk(
  "individualTrainee/setSolvingExam",
  async (courseAndExamID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.setSolvingExam(
        courseAndExamID,
        token
      );
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const answerExam = createAsyncThunk(
  "individualTrainee/answerExam",
  async (answerList, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(answerList);
      return await individualTraineeService.answerExam(answerList, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const viewPrevExam = createAsyncThunk(
  "individualTrainee/viewPrevExam",
  async (answers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.viewPrevExam(answers, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const viewAllCoursesFiltered = createAsyncThunk(
  "individualTrainee/viewAllCoursesFiltered",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.viewAllCoursesFiltered(x, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const rateCourses = createAsyncThunk(
  "individualTrainee/rateCourses",
  async (course_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.rateCourses(course_id, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const rateInstructors = createAsyncThunk(
  "individualTrainee/rateInstructors",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      // console.log(Instructor_id);

      return await individualTraineeService.rateInstructors(x, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const reviewCourses = createAsyncThunk(
  "individualTrainee/reviewCourses",
  async (rev, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.reviewCourses(rev, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const reviewInstructors = createAsyncThunk(
  "individualTrainee/reviewInstructors",
  async (rev, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.reviewInstructors(rev, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const openCourse = createAsyncThunk(
  "individualTrainee/openCourse",
  async (courseAndUserIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.openCourse(courseAndUserIDs, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const acceptPolicy = createAsyncThunk(
  "individualTrainee/acceptPolicy",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.acceptPolicy(x, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getInstructorRatings = createAsyncThunk(
  "individualTrainee/getInstructorRatings",
  async (instructorId, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.getInstructorRating(instructorId);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const requestRefund2 = createAsyncThunk(
  "individualTrainee/requestRefund2",
  async (CourseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.requestRefund2(CourseId, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setReviewCourse = createAsyncThunk(
  "individualTrainee/setReviewCourse",
  async (CourseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.setReviewCourse(CourseId, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setReviewInstructor = createAsyncThunk(
  "individualTrainee/setReviewInstructor",
  async (Instructor_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await individualTraineeService.setReviewInstructor(
        Instructor_id,
        token
      );
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const reportProblem = createAsyncThunk(
  'instructor/reportAproblem',
  async (problem, thunkAPI) => {   
    try {
      const token = thunkAPI.getState().auth.user.token
      return await individualTraineeService.report
      (problem,token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const viewProblem = createAsyncThunk(
  "individualTrainee/viewProblem",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await individualTraineeService.viewProblem(x, token);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const followUpProblem = createAsyncThunk(
  'individualTrainee/followUp',
  async (course, thunkAPI) => {   
    try {
      const token = thunkAPI.getState().auth.user.token
      const h = await individualTraineeService.followUpProblem(course,token)
      return h;
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const getfirstName = createAsyncThunk(
  'individualTrainee/getfirstName',
  async ( x,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await individualTraineeService.getfirstName(token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const getlastName = createAsyncThunk(
  'individualTrainee/getlastName',
  async ( x,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await individualTraineeService.getlastName(token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const sendEmail = createAsyncThunk(
  'individualTrainee/sendEmail',
  async (cname, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await individualTraineeService.sendEmail(cname,token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()
        
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const individualTraineeSlice = createSlice({
  name: "individualTrainee",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      //   state.courses = []
    },
    hardReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewAllCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(viewAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.courses = action.payload;
      })
      .addCase(viewAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getRegisteredCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getRegisteredCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.registeredCourses = action.payload;
      })
      .addCase(getRegisteredCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(registerCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(registerCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.registeredCourses = action.payload;
      })
      .addCase(registerCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(setSolvingExam.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(setSolvingExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.solvingExam = action.payload;
      })
      .addCase(setSolvingExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getsolvedExams.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getsolvedExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.solvedExams = action.payload;
      })
      .addCase(getsolvedExams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(viewPrevExam.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(viewPrevExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.answers = action.payload;
      })
      .addCase(viewPrevExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(viewAllCoursesFiltered.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(viewAllCoursesFiltered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.courses = action.payload;
      })
      .addCase(viewAllCoursesFiltered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(openCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(openCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.answers = action.payload;
      })
      .addCase(openCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setReviewCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(setReviewCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviewingCourse = action.payload;
      })
      .addCase(setReviewCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setReviewInstructor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(setReviewInstructor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviewingInstructor = action.payload;
      })
      .addCase(setReviewInstructor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
       // state. = action.payload

      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getfirstName.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(getfirstName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.firstName = action.payload

      })
      .addCase(getfirstName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getlastName.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(getlastName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.lastName = action.payload

      })
      .addCase(getlastName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(reportProblem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(reportProblem.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(reportProblem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.currCourse = ""
      })
      .addCase(viewProblem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(viewProblem.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(viewProblem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.problem = action.payload
      })
      .addCase(followUpProblem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(followUpProblem.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(followUpProblem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.problem = action.payload
      })
  },
});

export const { reset, hardReset } = individualTraineeSlice.actions;
export default individualTraineeSlice.reducer;
