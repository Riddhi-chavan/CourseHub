// reducers.js
import { SET_ACTIVE_INDEX } from "../ActionTypes";

const initialState = {
  activeIndex: null,
};

const syllabusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.payload,
      };
    default:
      return state;
  }
};

export default syllabusReducer;
