import { InputBase, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useCallback } from "react";
import { useBuscador } from "../../contexts/searchContext";
import { useTheme } from "../../contexts/themeContext";

export const SearchBar = () => {
  const { searchTerm, error, handleSearch, loading, dispatch } = useBuscador();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && searchTerm) {
        handleSearch(searchTerm, "", user?.University);
        navigate("/app/results");
      }
    },
    [searchTerm, handleSearch, user, navigate]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm) {
        handleSearch(searchTerm, "", user?.University);
        navigate("/app/results");
      }
    },
    [searchTerm, handleSearch, user, navigate]
  );

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <div className="navbar-search-container">
      <div className="search-wrapper">
        <InputBase
          placeholder={error ? error : "Buscar materia"}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.51)"
                : "rgba(255, 255, 255, 0.8)",
            color: theme.palette.text.primary,
            backdropFilter: "blur(10px)",
            border: error
              ? `2px solid ${theme.palette.error.main}`
              : "2px solid transparent",
            borderRadius: "25px",
            height: "50px",
            width: "100%",
            maxWidth: "500px",
            padding: "0 20px",
            margin: "10px auto",
            transition: theme.transitions.create(["all"], {
              duration: theme.transitions.duration.short,
            }),
            boxShadow: error
              ? `0px 0px 12px ${theme.palette.error.main}`
              : theme.palette.mode === "dark"
              ? "0px 4px 12px rgba(0, 0, 0, 0.4)"
              : "0px 4px 12px rgba(0, 0, 0, 0.2)",
            "&:focus-within": {
              boxShadow: `0px 4px 16px ${theme.palette.primary.main}40`,
              border: `2px solid ${theme.palette.primary.main}`,
            },
            "& .MuiInputBase-input": {
              "&::placeholder": {
                color: error
                  ? theme.palette.error.main
                  : theme.palette.text.secondary,
                opacity: 1,
              },
            },
          }}
          endAdornment={
            loading ? (
              <CircularProgress
                size={20}
                sx={{
                  ml: 1,
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                }}
              />
            ) : (
              <SearchIcon
                sx={{
                  color: theme.palette.text.secondary,
                  cursor: "pointer",
                  transition: theme.transitions.create(["color"], {
                    duration: theme.transitions.duration.short,
                  }),
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={handleSubmit}
              />
            )
          }
        />
      </div>
    </div>
  );
};
