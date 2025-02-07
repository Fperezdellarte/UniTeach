import { InputBase, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBuscador } from "../../contexts/searchContext";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

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
    <form onSubmit={handleSubmit}>
      <div className="navbar-search-container">
        <InputBase
          placeholder={error ? error : "Buscar materia..."}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          sx={{
            backgroundColor: "white",
            border: error ? "2px solid red" : "none",
            borderRadius: "10px",
            height: "39.5px",
            padding: "8px",
          }}
          endAdornment={
            loading ? (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            ) : (
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon style={{ color: "black" }} />
              </IconButton>
            )
          }
        />
      </div>
    </form>
  );
};
