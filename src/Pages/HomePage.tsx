import React from "react";
import MovieCard from "../components/MovieCard";
import { Stack } from "@mui/material";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type Movie } from "../types/movies";
import { useMediaQuery, useTheme } from "@mui/material";
import HorizontalScroller from "../components/HorizontalScroller";

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useTrendingMovies();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies</div>;

  return !isMobile ? (
    <HorizontalScroller>
      {data.results.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : "https://placehold.co/154x400?text=No+image"
          }
        />
      ))}
    </HorizontalScroller>
  ) : (
    <Stack spacing={2} sx={{ py: 2 }}>
      {data.results.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : "https://placehold.co/154x400?text=No+image"
          }
        />
      ))}
    </Stack>
  );
};

export default HomePage;
