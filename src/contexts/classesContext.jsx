import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "./authContext";
import { fetchUserClasses } from "../service/clasessService";
import { classesReducer } from "../store/classesReducer";

export const ClassesContext = createContext();

const initialState = {
  classesData: {
    upcoming: [],
    recent: [],
  },
  error: null,
  loading: true,
};

export const ClassesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classesReducer, initialState);
  const { token } = useAuth();

  const fetchClassesData = useCallback(async () => {
    if (!token) {
      dispatch({ type: "FETCH_ERROR", payload: "User not authenticated" });
      return;
    }

    try {
      dispatch({ type: "FETCH_START" });

      const allClasses = await fetchUserClasses(token);
      const currentDate = new Date();

      const upcoming = allClasses.filter(
        (c) => new Date(c.endDate) >= currentDate
      );

      const recent = allClasses
        .filter((c) => new Date(c.endDate) < currentDate)
        .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
        .slice(0, 10);

      dispatch({
        type: "FETCH_SUCCESS",
        payload: { upcoming, recent },
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.message || "Error al cargar las clases",
      });
    }
  }, [token, dispatch]);
  useEffect(() => {
    fetchClassesData();
  }, [fetchClassesData, token]);

  return (
    <ClassesContext.Provider
      value={{
        classesData: state.classesData,
        error: state.error,
        loading: state.loading,
        fetchClassesData,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};
