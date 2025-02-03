import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import LogoutButton from "../button/LogoutButton";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar
          src={user?.Avatar_URL}
          alt={user?.Name}
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("/app/perfil")}>Mi Perfil</MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
