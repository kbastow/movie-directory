import React from "react";
import { Box, Typography } from "@mui/material";
import { type MovieApiResponse } from "../types/movies";
import type { InfiniteData } from "@tanstack/react-query";
import HorizontalScroller from "./HorizontalScroller";
import MovieCard from "./MovieCard";
import LoadingContainer from "./LoadingContainer";

type MovieSectionProps = {
  title: string;
  type: "trending" | "top_rated" | "now_playing";
  data?: InfiniteData<MovieApiResponse, unknown>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
};

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
}) => {
  const movies =
    data?.pages.flatMap((page: MovieApiResponse) => page.results) ?? [];

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isError) {
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
      <HorizontalScroller
        showArrowsOnMobile
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </HorizontalScroller>
    </Box>
  );
};
export default MovieSection;
