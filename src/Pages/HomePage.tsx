import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Stack, Typography } from "@mui/material";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { type Movie } from "../types/movies";
import { useMediaQuery, useTheme } from "@mui/material";
import HorizontalScroller from "../components/HorizontalScroller";
import MovieSection from "../components/MovieSection";
import { useQueryClient } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/movies";
import MobilePaginationControls from "../components/MobilePaginationControls";

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useTrendingMovies(page);
  const [mobileSlicePage, setMobileSlicePage] = useState(1);

  const itemsPerPage = 5;
  const startIndex = (mobileSlicePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const mobileResults = data?.results.slice(startIndex, endIndex) || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  useEffect(() => {
    if (data && page < data.total_pages) {
      queryClient.prefetchQuery({
        queryKey: ["trendingMovies", page + 1],
        queryFn: () => fetchTrendingMovies(page + 1),
      });
    }
  }, [page, data, queryClient]);

  useEffect(() => {
    if (isMobile) {
      setMobileSlicePage(() => {
        const totalSlices = Math.ceil(
          (data?.results.length || 0) / itemsPerPage
        );
        return totalSlices;
      });
    }
  }, [page, isMobile, data?.results.length]);

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
              {mobileResults.map((movie: Movie) => (
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
            <MobilePaginationControls
              page={page}
              setPage={setPage}
              slicePage={mobileSlicePage}
              setSlicePage={setMobileSlicePage}
              itemsPerPage={itemsPerPage}
              resultsLength={data.results.length}
              totalPages={data.total_pages}
            ></MobilePaginationControls>
          </>
        )}
      </MovieSection>
    </>
  );
};

export default HomePage;
