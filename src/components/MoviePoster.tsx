import React from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import { getImageUrl } from "../utils/getImageUrl";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";

export type MoviePosterProps = {
  id: number;
  title: string;
  poster_path: string | null;
  onClick?: () => void;
  fullWidth?: boolean;
};

interface StyledMoviePosterProps {
  fullWidth?: boolean;
  isMobile: boolean;
}

const StyledMoviePoster = styled("img")<StyledMoviePosterProps>(
  ({ fullWidth, isMobile }) => ({
    width: "100%",
    maxWidth: fullWidth ? "100%" : isMobile ? 100 : 320,
    height: "100%",
    borderRadius: 1,
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  })
);

const MoviePoster: React.FC<MoviePosterProps> = ({
  id,
  title,
  poster_path,
  onClick,
  fullWidth,
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/movie/${id}`);
    }
  };

  return (
    <Box onClick={handleClick}>
      <StyledMoviePoster
        src={getImageUrl(poster_path, "w342")}
        alt={title}
        fullWidth={fullWidth}
        isMobile={isMobile}
      />
    </Box>
  );
};

export default MoviePoster;
