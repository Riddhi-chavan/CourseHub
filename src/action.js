import {
  SIGN_IN,
  SIGN_OUT,
  CLEAR_SELECTED_COURSE_ID,
  SET_ACTIVE_INDEX,
  SET_SELECTED_COURSE_ID,
  SET_COURSES,
  SET_FILTERED_COURSES,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCH_QUERY,
  SET_SEARCH_FIELD,
} from "./ActionTypes";

export const signIn = (userData) => ({
  type: SIGN_IN,
  payload: {
    uid: userData.uid,
    email: userData.email,
    photoURL: userData.photoURL,
  },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const setSelectedCourseId = (courseId) => ({
  type: SET_SELECTED_COURSE_ID,
  payload: courseId,
});

export const clearSelectedCourseId = () => ({
  type: CLEAR_SELECTED_COURSE_ID,
});

export const setActiveIndex = (index) => ({
  type: SET_ACTIVE_INDEX,
  payload: index,
});

export const setCourses = (courses) => ({
  type: SET_COURSES,
  payload: courses,
});

export const setFilteredCourses = (filteredCourses) => ({
  type: SET_FILTERED_COURSES,
  payload: filteredCourses,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setSearchField = (field) => ({
  type: SET_SEARCH_FIELD,
  payload: field,
});
