import { combineReducers } from "redux";
import authReducer from "./authReducer";
import syllabusReducer from "./syllabusReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  syllabus: syllabusReducer,
  course: courseReducer,
});

export default rootReducer;
