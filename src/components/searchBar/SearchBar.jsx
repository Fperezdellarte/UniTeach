import { InputBase, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBuscador } from "../../hooks/useBuscador";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, error, handleSearch, loading } =
    useBuscador();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm) {
      handleSearch();
    } else {
      return error;
    }
  };

  return (
    <div className="navbar-search-container">
      <InputBase
        placeholder={error ? error : "Buscar materia..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          border: error ? "2px solid red" : "none",
          borderRadius: "4px",
          padding: "8px",
        }}
      />
      {loading ? (
        <CircularProgress size={20} sx={{ ml: 1 }} />
      ) : (
        <IconButton onClick={() => handleSearch()}>
          <SearchIcon />
        </IconButton>
      )}
    </div>
  );
};
