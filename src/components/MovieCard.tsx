import React, { useState } from "react";
import {
  Box,
  CardMedia,
  Typography,
  CardActionArea,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Movie } from "../types/movies";
import { getImageUrl } from "../utils/getImageUrl";
import theme from "../styles/theme";

interface MovieCardProps {
  movie: Movie;
}

const MovieCardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ isMobile }) => ({
  position: "relative",
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  width: isMobile ? "100%" : 160,
  height: isMobile ? 90 : 240,
  cursor: "pointer",
  overflow: "hidden",
}));

const MovieCardContent = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const MovieCardContentOverlay = styled(MovieCardContent, {
  shouldForwardProp: (prop) => prop !== "isMobile" && prop !== "visible",
})<{
  isMobile: boolean;
  visible: boolean;
}>(({ theme, isMobile, visible }) => ({
  position: isMobile ? "static" : "absolute",
  bottom: isMobile ? "auto" : 0,
  left: isMobile ? "auto" : 0,
  width: isMobile ? "100%" : "100%",
  height: isMobile ? "100%" : "100%",
  background: isMobile
    ? "none"
    : "linear-gradient(to top, rgba(21, 31, 53, 1) 30%, rgba(21, 31, 53, 0.65) 70%, rgba(21, 31, 53, 0.25) 100%)",
  color: theme.palette.text.primary,
  transition: "opacity 0.3s",
  opacity: isMobile ? 1 : visible ? 1 : 0,
  pointerEvents: isMobile ? "auto" : visible ? "auto" : "none",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(1),
}));

const MovieCardMedia = styled(CardMedia, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? 60 : "100%",
  height: isMobile ? "100%" : 240,
  objectFit: "cover",
  padding: isMobile ? theme.spacing(1) : 0,
  flexShrink: 0,
}));

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hovered, setHovered] = useState(false);

  return (
    <CardActionArea
      component={Link}
      to={`/movie/${id}`}
      sx={{ width: isMobile ? "100%" : 160 }}
    >
      <MovieCardWrapper
        isMobile={isMobile}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        <MovieCardMedia
          isMobile={isMobile}
          image={getImageUrl(poster_path, "w500")}
          title={title}
        />

        <MovieCardContentOverlay
          isMobile={isMobile}
          visible={isMobile || (hovered && !isMobile)}
        >
          <Typography variant="h6">{title}</Typography>

          <Typography variant="subtitle2" noWrap={!isMobile}>
            {release_date?.slice(0, 4)}
          </Typography>
        </MovieCardContentOverlay>
      </MovieCardWrapper>
    </CardActionArea>
  );
};

export default MovieCard;
