import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { FavoriteBorder, Search as SearchIcon } from "@mui/icons-material";
import { NavLink } from "react-router";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" noWrap>
            🎬 Movie Directory
          </Typography>
        </NavLink>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "grey.700",
            borderRadius: 1,
            px: 1,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: "grey.500" }}></SearchIcon>
          <InputBase placeholder="Search movies..."></InputBase>
        </Box>
        <NavLink to="/favourites">
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
