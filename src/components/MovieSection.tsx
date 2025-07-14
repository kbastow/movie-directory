import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import { type Movie } from "../types/movies";
import HorizontalScroller from "./HorizontalScroller";
import MovieCard from "./MovieCard";
import MobilePaginationControls from "./MobilePaginationControls";
import { useQueryClient } from "@tanstack/react-query";
import { fetchMoviesByType } from "../api/movies";

type MovieSectionProps = {
  title: string;
  type: "trending" | "top_rated" | "now_playing";
};

const MovieSection: React.FC<MovieSectionProps> = ({ title, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Mobile pagination
  const [page, setPage] = useState(1);
  const [slicePage, setSlicePage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: mobileData,
    isLoading: isMobileLoading,
    isError: isMobileError,
  } = useMovies(type, page);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isMobile || !mobileData) return;
    if (page < mobileData.total_pages) {
      queryClient.prefetchQuery({
        queryKey: ["movies", type, page + 1],
        queryFn: () => fetchMoviesByType(type, page + 1),
      });
    }
  }, [page, isMobile, mobileData, queryClient, type]);

  const mobileResults =
    mobileData?.results.slice(
      (slicePage - 1) * itemsPerPage,
      slicePage * itemsPerPage
    ) || [];

  // Desktop infinite scroll
  const {
    data: infiniteData,
    isLoading: isDesktopLoading,
    isError: isDesktopError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies(type);

  if ((isMobile && isMobileLoading) || (!isMobile && isDesktopLoading)) {
    return <CircularProgress />;
  }

  if ((isMobile && isMobileError) || (!isMobile && isDesktopError)) {
    return (
      <Typography color="error">
        Failed to load {title.toLowerCase()}
      </Typography>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography component="h2" variant="h6" sx={{ my: 1 }}>
        {title}
      </Typography>
      {isMobile ? (
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
          {mobileData && (
            <MobilePaginationControls
              page={page}
              setPage={setPage}
              slicePage={slicePage}
              setSlicePage={setSlicePage}
              itemsPerPage={itemsPerPage}
              resultsLength={mobileData.results.length}
              totalPages={mobileData.total_pages}
            />
          )}
        </>
      ) : (
        <HorizontalScroller
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {infiniteData?.pages.flatMap((group) =>
            group.results.map((movie: Movie) => (
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
            ))
          )}
        </HorizontalScroller>
      )}
    </Box>
  );
};
export default MovieSection;
