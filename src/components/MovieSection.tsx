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
import { type Movie, type MovieApiResponse } from "../types/movies";
import HorizontalScroller from "./HorizontalScroller";
import MovieCard from "./MovieCard";
import MobilePaginationControls from "./MobilePaginationControls";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { fetchMoviesByType } from "../api/movies";

type MovieSectionProps = {
  title: string;
  type: "trending" | "top_rated" | "now_playing";
  data: MovieApiResponse | InfiniteData<MovieApiResponse> | undefined;
};

const MovieSection: React.FC<MovieSectionProps> = ({ title, type, data }) => {
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

  const movies: Movie[] = isMobile
    ? (data as MovieApiResponse)?.results.slice(
        (slicePage - 1) * itemsPerPage,
        slicePage * itemsPerPage
      ) ?? []
    : (data as InfiniteData<MovieApiResponse>)?.pages.flatMap(
        (page) => page.results
      ) ?? [];

  // Desktop infinite scroll
  const {
    fetchNextPage,
    hasNextPage,
    isLoading: isDesktopLoading,
    isFetchingNextPage,
    isError: isDesktopError,
  } = useInfiniteMovies(type);

  if ((isMobile && isMobileLoading) || (!isMobile && isDesktopLoading)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
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
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Stack>
          {data && (
            <MobilePaginationControls
              page={page}
              setPage={setPage}
              slicePage={slicePage}
              setSlicePage={setSlicePage}
              itemsPerPage={itemsPerPage}
              resultsLength={(data as MovieApiResponse).results.length}
              totalPages={(data as MovieApiResponse).total_pages}
            />
          )}
        </>
      ) : (
        <HorizontalScroller
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </HorizontalScroller>
      )}
    </Box>
  );
};
export default MovieSection;
