import React from "react";
import { Box, styled } from "@mui/material";
import { getImageUrl } from "../utils/getImageUrl";
import { useNavigate } from "react-router-dom";

export type MoviePosterProps = {
  id: number;
  title: string;
  poster_path: string | null;
  onClick?: () => void;
};

const MoviePoster: React.FC<MoviePosterProps> = ({
  id,
  title,
  poster_path,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/movie/${id}`);
    }
  };

  const StyledMoviePoster = styled("img")(() => ({
    width: 100,
    height: "100%",
    borderRadius: 1,
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  return (
    <Box
      sx={{
        width: 100,
        flex: "0 0 auto",
      }}
      onClick={handleClick}
    >
      <StyledMoviePoster src={getImageUrl(poster_path, "w342")} alt={title} />
    </Box>
  );
};

export default MoviePoster;
