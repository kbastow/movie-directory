import React, { useState } from "react";
import {
  Box,
  Typography,
  CardActionArea,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Movie } from "../types/movies";
import { getImageUrl } from "../utils/getImageUrl";

interface MovieCardProps {
  movie: Movie;
}

const MovieCardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ isMobile }) => ({
  position: "relative",
  display: "flex",
  flexDirection: isMobile ? "row" : "column",
  width: isMobile ? 120 : 160,
  height: isMobile ? 180 : 240,
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
  shouldForwardProp: (prop) => prop !== "visible",
})<{
  visible: boolean;
}>(({ theme, visible }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to top, rgba(21, 31, 53, 0.85) 30%, rgba(21, 31, 53, 0.45) 75%, rgba(21, 31, 53, 0.0) 100%)",
  color: theme.palette.text.primary,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  padding: theme.spacing(1),
  transition: "opacity 0.3s",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
}));

const MovieCardMedia = styled("img", {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ isMobile }) => ({
  width: "100%",
  height: isMobile ? 180 : 240,
  objectFit: "cover",
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
      sx={{ width: "100%", height: "100%" }}
    >
      <MovieCardWrapper
        isMobile={isMobile}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        <MovieCardMedia
          isMobile={isMobile}
          src={getImageUrl(poster_path, "w500")}
          alt={title}
        />
        <MovieCardContentOverlay visible={hovered} data-testid="movie-overlay">
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
