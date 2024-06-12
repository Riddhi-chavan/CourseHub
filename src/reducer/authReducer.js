import {
  SIGN_IN,
  SIGN_OUT,
  SET_SELECTED_COURSE_ID,
  CLEAR_SELECTED_COURSE_ID,
} from "../ActionTypes";

const initialState = {
  user: null,
  login: false,
  selectedCourseId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        login: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        login: false,
      };
    case SET_SELECTED_COURSE_ID:
      return {
        ...state,
        selectedCourseId: action.payload,
      };
    case CLEAR_SELECTED_COURSE_ID:
      return {
        ...state,
        selectedCourseId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
