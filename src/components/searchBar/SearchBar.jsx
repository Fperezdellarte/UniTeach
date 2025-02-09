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
      <div className="search-wrapper">
        <InputBase
          placeholder={error ? error : "Buscar materia"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo translúcido
            backdropFilter: "blur(10px)", // Desenfoque para el efecto "glass"
            border: error ? "2px solid red" : "2px solid transparent",
            borderRadius: "25px",
            height: "50px",
            width: "100%",
            maxWidth: "500px",
            padding: "0 20px",
            margin: "10px auto", // Centrado horizontal
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
                onMouseEnter={(e) => (e.target.style.color = "#007bff")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              />
            )
          }
        />
      </div>
    </div>
  );
}  