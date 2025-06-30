import React from "react";
import MovieCard from "../components/MovieCard";
import { Box } from "@mui/material";

const mockMovies = [
  {
    id: 1,
    title: "Dune",
    poster_path: "https://placehold.co/150x400?text=Dune",
  },
  {
    id: 2,
    title: "Godzilla",
    poster_path: "https://placehold.co/150x400?text=Godzilla",
  },
  {
    id: 3,
    title: "Barbie",
    poster_path: "https://placehold.co/150x400?text=Barbie",
  },
];

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "left",
        py: 6,
      }}
    >
      {mockMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
        />
      ))}
    </Box>
  );
};

export default HomePage;
