import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import corporateTraineeService from "./corporateTraineeService";

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
  requests: [],
  firstName:'',
  lastName:'', 
  problem:[]
};

// Adding admin
export const viewAllCourses = createAsyncThunk(
  "corporateTrainee/viewAllCourses",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.viewAllCourses(token);
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
  "corporateTrainee/getsolvedExams",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.getsolvedExams(token);
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
  "corporateTrainee/getRegisteredCourses",
  async (registeredIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.getRegisteredCourses(
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

export const registerCourse = createAsyncThunk(
  "corporateTrainee/registerCourse",
  async (courseAndUserIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.registerCourse(
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
  "corporateTrainee/setSolvingExam",
  async (courseAndExamID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.setSolvingExam(
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
  "corporateTrainee/answerExam",
  async (answerList, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(answerList);
      return await corporateTraineeService.answerExam(answerList, token);
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
  "corporateTrainee/viewPrevExam",
  async (answers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.viewPrevExam(answers, token);
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
  "corporateTrainee/viewAllCoursesFiltered",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.viewAllCoursesFiltered(x, token);
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
  "corporateTrainee/openCourse",
  async (courseAndUserIDs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.openCourse(courseAndUserIDs, token);
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

export const viewMyRequests = createAsyncThunk(
  "corporateTrainee/viewMyRequests",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.viewMyRequests(token);
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

export const requestCourse = createAsyncThunk(
  "corporateTrainee/requestCourse",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.requestCourse(x, token);
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
  "corporateTrainee/rateCourses",
  async (course_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.rateCourses(course_id, token);
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
  "corporateTrainee/rateInstructors",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      // console.log(Instructor_id);

      return await corporateTraineeService.rateInstructors(x, token);
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
  "corporateTrainee/reviewCourses",
  async (rev, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.reviewCourses(rev, token);
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
  "corporateTrainee/reviewInstructors",
  async (rev, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.reviewInstructors(rev, token);
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
  "corporateTrainee/setReviewCourse",
  async (CourseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.setReviewCourse(CourseId, token);
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
  "corporateTrainee/setReviewInstructor",
  async (Instructor_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.setReviewInstructor(
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
export const acceptPolicy = createAsyncThunk(
  "corporateTrainee/acceptPolicy",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await corporateTraineeService.acceptPolicy(x, token);
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
export const getfirstName = createAsyncThunk(
  'individualTrainee/getfirstName',
  async ( x,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await corporateTraineeService.getfirstName(token)
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
      return await corporateTraineeService.getlastName(token)
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
  'corporateTrainee/sendEmail',
  async (cname, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await corporateTraineeService.sendEmail(cname,token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()
        
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const reportProblem = createAsyncThunk(
  'corporateTrainee/reportAproblem',
  async (problem, thunkAPI) => {   
    try {
      const token = thunkAPI.getState().auth.user.token
      return await corporateTraineeService.reportProblem(problem,token)
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
  "corporateTrainee/viewProblem",
  async (x, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await corporateTraineeService.viewProblem(x, token);
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
  'corporateTrainee/followUp',
  async (course, thunkAPI) => {   
    try {
      const token = thunkAPI.getState().auth.user.token
      const h = await corporateTraineeService.followUpProblem(course,token)
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


export const corporateTraineeSlice = createSlice({
  name: "corporateTrainee",
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

      .addCase(viewMyRequests.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(viewMyRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.requests = action.payload;
      })
      .addCase(viewMyRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(requestCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(requestCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(requestCourse.rejected, (state, action) => {
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
      
     
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false

      })
      .addCase(sendEmail.rejected, (state, action) => {
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

export const { reset, hardReset } = corporateTraineeSlice.actions;
export default corporateTraineeSlice.reducer;
