import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ searchTerm, setSearchTerm, error, onSearch }) => {
  return (
    <div className="navbar-search-container">
      <InputBase
        placeholder={error ? "Busca Una Materia" : "Buscar materia..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        sx={{
          border: error ? "2px solid red" : "none",
          borderRadius: "4px",
          padding: "8px",
        }}
      />
      <IconButton onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
