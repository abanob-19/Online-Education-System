import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
import instructorReducer from '../features/instructor/instructorSlice'
import individualTraineeReducer from '../features/individualTrainee/individualTraineeSlice';
import corporateTraineeReducer from '../features/corporateTrainee/corporateTraineeSlice';
import guestReducer from '../features/guest/guestSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    admin:adminReducer,
    instructor:instructorReducer,
    individualTrainee:individualTraineeReducer,
    corporateTrainee:corporateTraineeReducer,
    guest:guestReducer,

  },
});
