import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import { Stack, Button, Typography } from "@mui/material";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type Movie } from "../types/movies";
import { useMediaQuery, useTheme } from "@mui/material";
import HorizontalScroller from "../components/HorizontalScroller";

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  console.log("Page:", page);

  const { data, isLoading, isError } = useTrendingMovies(page);

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
    <>
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
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Button
          variant="contained"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Typography variant="body1">Page {page}</Typography>

        <Button
          variant="contained"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === data.total_pages}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
