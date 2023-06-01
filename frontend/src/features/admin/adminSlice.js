import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  courses:[],
  reports:[],
  requests:[],
  courseRequests:[],
}

// Adding admin
export const addAdmin = createAsyncThunk(
  'admin/addAdmin',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.addAdmin(user,token)
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Adding instructor
export const addInstructor = createAsyncThunk(
    'admin/addInstructor',
    async (user, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.addInstructor(user,token)
      } catch (error) {        
        const message =
          (error.response.data && error.response && error.response.data.message) ||
          error.message ||
          error.toString()
  
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

  // Adding corporate trainee
export const addCorporateTrainee = createAsyncThunk(
    'admin/addCorporateTrainee',
    async (user, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.addCorporateTrainee(user,token)
      } catch (error) {        
        const message =
          (error.response.data && error.response && error.response.data.message) ||
          error.message ||
          error.toString()
  
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

  export const viewAllCourses = createAsyncThunk(
    'admin/viewAllCourses',
    async ( x,thunkAPI) => {
      try {
  
        const token = thunkAPI.getState().auth.user.token
  
        return await adminService.viewAllCourses(token)
      } catch (error) {        
        const message =
          (error.response.data && error.response && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

  export const viewAllCoursesFiltered = createAsyncThunk(
    'admin/viewAllCoursesFiltered',
    async ( x,thunkAPI) => {
      try {
  
        const token = thunkAPI.getState().auth.user.token
  
        return await adminService.viewAllCoursesFiltered(x,token)
      } catch (error) {        
        const message =
          (error.response.data && error.response && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )
  
  export const setDiscountCourses = createAsyncThunk(
    'admin/setDiscountCourses',
    async ( x,thunkAPI) => {
      try {
  
        const token = thunkAPI.getState().auth.user.token
  
        return await adminService.setDiscountCourses(x,token)
      } catch (error) {        
        const message =
          (error.response.data && error.response && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

    export const viewAllReports = createAsyncThunk(
      'admin/viewAllReports', 
      async (x, thunkAPI) => {
        try {
    
          const token = thunkAPI.getState().auth.user.token
    
          return await adminService.viewAllReports(token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )

    export const viewUnseenReports = createAsyncThunk(
      'admin/viewUnseenReports',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.viewUnseenReports(token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )

    export const setStatus = createAsyncThunk(
      'admin/setStatus',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.setStatus(x,token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )

    export const viewRequests = createAsyncThunk(
      'admin/viewRequests',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.viewRequests(token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )

    export const rejectRefundRequest = createAsyncThunk(
      'admin/rejectRefundRequest',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.rejectRefundRequest(x,token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )  

    export const acceptRefundRequest = createAsyncThunk(
      'admin/acceptRefundRequest',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.acceptRefundRequest(x,token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )  

    export const viewCourseRequests = createAsyncThunk(
      'admin/viewCourseRequests',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.viewCourseRequests(token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )
    
    export const courseRequestResponse = createAsyncThunk(
      'admin/courseRequestResponse',
      async ( x,thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await adminService.courseRequestResponse(x,token)
        } catch (error) {        
          const message =
            (error.response.data && error.response && error.response.data.message) ||
            error.message ||
            error.toString()
          
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )  
 
    
    
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdmin.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addInstructor.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      .addCase(addCorporateTrainee.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(addCorporateTrainee.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(addCorporateTrainee.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(viewAllCourses.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(viewAllCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.courses = action.payload
      })
      .addCase(viewAllCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(viewAllCoursesFiltered.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(viewAllCoursesFiltered.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.courses = action.payload
      })
      .addCase(viewAllCoursesFiltered.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(setDiscountCourses.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(setDiscountCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // state.courses = action.payload
      })
      .addCase(setDiscountCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(viewAllReports.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(viewAllReports.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.reports = action.payload
      })
      .addCase(viewAllReports.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(viewUnseenReports.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(viewUnseenReports.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.reports = action.payload
      })
      .addCase(viewUnseenReports.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      .addCase(setStatus.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(setStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(setStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(viewRequests.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(viewRequests.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.requests = action.payload
      })
      .addCase(viewRequests.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(rejectRefundRequest.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(rejectRefundRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(rejectRefundRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(acceptRefundRequest.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(acceptRefundRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(acceptRefundRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      

      .addCase(viewCourseRequests.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(viewCourseRequests.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.courseRequests = action.payload
      })
      .addCase(viewCourseRequests.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(courseRequestResponse.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
  
      })
      .addCase(courseRequestResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(courseRequestResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      
  },
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer