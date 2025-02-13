import { createContext, useReducer, useContext } from "react";
import { buscadorReducer } from "../store/buscadorReducer";
import { buscadorService } from "../service/buscadorService";
import { OTHER_UNIVERSITIES } from "../config/constans";
import { useAuth } from "../contexts/authContext";

const BuscadorContext = createContext();

const initialState = {
  searchTerm: "",
  searchFacultad: "",
  results: [],
  otherResults: [],
  loading: false,
  error: null,
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(buscadorReducer, initialState);
  const { user } = useAuth();

  const handleSearch = async (searchTerm, facultad) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
    if (facultad) {
      dispatch({ type: "SET_SEARCH_FACULTAD", payload: facultad });
    }

    try {
      const userUniversity = user?.University || null;

      if (facultad !== "") {
        const results = await buscadorService.fetchMentors(
          (searchTerm = null),
          facultad,
          user?.University
        );
        dispatch({ type: "SET_RESULTS", payload: { results } });
        return;
      }

      const results = await buscadorService.fetchMentors(
        searchTerm,
        facultad,
        userUniversity
      );

      const otherResults = await Promise.all(
        OTHER_UNIVERSITIES.filter((uni) => uni !== userUniversity).map(
          async (uni) => {
            return await buscadorService.fetchMentors(
              searchTerm,
              facultad,
              uni
            );
          }
        )
      );
      const mergedOtherResults = otherResults.flat();

      dispatch({
        type: "SET_RESULTS",
        payload: {
          results,
          otherResults: mergedOtherResults,
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <BuscadorContext.Provider value={{ ...state, handleSearch, dispatch }}>
      {children}
    </BuscadorContext.Provider>
  );
};

export const useBuscador = () => useContext(BuscadorContext);
