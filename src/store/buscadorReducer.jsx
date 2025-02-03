export const buscadorReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        searchTerm: action.payload?.searchTerm || "",
        results: action.payload?.results || [],
        otherResults: action.payload?.otherResults || [],
        loading: false,
        error: null,
      };

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_RESULTS":
      return {
        ...state,
        results: action.payload.results,
        otherResults: action.payload.otherResults,
        error: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
