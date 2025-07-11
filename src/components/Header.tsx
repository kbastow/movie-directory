import { AppBar, Box, IconButton, InputBase, Toolbar } from "@mui/material";
import { FavoriteBorder, Search as SearchIcon } from "@mui/icons-material";
import { NavLink } from "react-router";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <NavLink
          to="/"
          title="Home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          🎬
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
        <NavLink to="/favourites" title="Favourites">
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
