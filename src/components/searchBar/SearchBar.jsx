import { InputBase, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBuscador } from "../../hooks/useBuscador";
import { text } from "@fortawesome/fontawesome-svg-core";
import { color } from "framer-motion";

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
          backgroundColor: "white",
          border: error ? "2px solid red" : "none",
          borderRadius: "10px",
          height:"39.5px",
          padding: "8px",
        }}
        endIcon={loading ? (
          <CircularProgress size={20} sx={{ ml: 1 }} />
        ) : (
            <SearchIcon style={{color:"black"}} />
         
        )}
      />
      
    </div>
  );
};
