import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Stack, Button, Typography } from "@mui/material";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type Movie } from "../types/movies";
import { useMediaQuery, useTheme } from "@mui/material";
import HorizontalScroller from "../components/HorizontalScroller";
import MovieSection from "../components/MovieSection";

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  console.log("Page:", page);

  const { data, isLoading, isError } = useTrendingMovies(page);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, isMobile]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies</div>;

  return (
    <>
      <Typography component="h1" variant="h2" sx={{ mb: 4 }} noWrap>
        Movie Directory
      </Typography>
      <MovieSection title="Trending Movies">
        {!isMobile ? (
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
                release_date={movie.release_date}
                vote_average={movie.vote_average}
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
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              ))}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              sx={{ py: 2 }}
            >
              <Button
                variant="contained"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>

              <Typography variant="body1">{page}</Typography>

              <Button
                variant="contained"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === data.total_pages}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
      </MovieSection>
    </>
  );
};

export default HomePage;
