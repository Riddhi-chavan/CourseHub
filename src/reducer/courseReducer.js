// reducers.js
import {
  SET_SELECTED_COURSE_ID,
  SET_COURSES,
  SET_FILTERED_COURSES,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCH_QUERY,
  SET_SEARCH_FIELD,
} from "../ActionTypes";

const initialState = {
  selectedCourseId: null,
  courses: [],
  filteredCourses: [],
  loading: true,
  error: null,
  searchQuery: "",
  searchField: "",
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_COURSE_ID:
      return { ...state, selectedCourseId: action.payload };
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
        filteredCourses: action.payload,
      };
    case SET_FILTERED_COURSES:
      return { ...state, filteredCourses: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SET_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

export default courseReducer;
