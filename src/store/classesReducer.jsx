export const classesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        classesData: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_CLASSES":
      return {
        ...state,
        classesData: {
          ...state.classesData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
