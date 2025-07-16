import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import { NavLink } from "react-router";
import SearchInput from "./SearchInput";
import theme from "../styles/theme";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <NavLink
          to="/"
          title="Home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            component="span"
            sx={{ minWidth: 44, height: 44, fontSize: 32 }}
          >
            🎬
          </Typography>
        </NavLink>

        <SearchInput />
        <NavLink to="/favourites" title="Favourites">
          <IconButton sx={{ minWidth: 44, height: 44 }}>
            <FavoriteBorder />
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
