import { InputBase, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useCallback } from "react";
import { useBuscador } from "../../contexts/searchContext";

export const SearchBar = () => {
  const { searchTerm, error, handleSearch, loading, dispatch } = useBuscador();
  const navigate = useNavigate();
  const { user } = useAuth();

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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: error ? "2px solid red" : "2px solid transparent",
            borderRadius: "25px",
            height: "50px",
            width: "100%",
            maxWidth: "500px",
            padding: "0 20px",
            margin: "10px auto",
            transition: "all 0.3s ease-in-out",
            boxShadow: error
              ? "0px 0px 12px rgba(255, 0, 0, 0.6)"
              : "0px 4px 12px rgba(0, 0, 0, 0.2)",
            "&:focus-within": {
              boxShadow: "0px 4px 16px rgba(0, 123, 255, 0.5)",
              border: "2px solid #007bff",
            },
          }}
          endAdornment={
            loading ? (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            ) : (
              <SearchIcon
                style={{
                  color: "black",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onClick={handleSubmit}
                onMouseEnter={(e) => (e.target.style.color = "#007bff")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              />
            )
          }
        />
      </div>
    </div>
  );
};
