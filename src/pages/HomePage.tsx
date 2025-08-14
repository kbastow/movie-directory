import React from "react";
import { Box, Typography } from "@mui/material";
import MovieSection from "../components/MovieSection";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import LoadingContainer from "../components/LoadingContainer";

const HomePage: React.FC = () => {
  const trendingInfinite = useInfiniteMovies("trending");
  const nowPlayingInfinite = useInfiniteMovies("now_playing");
  const topRatedInfinite = useInfiniteMovies("top_rated");

  const isLoading =
    trendingInfinite.isLoading ||
    nowPlayingInfinite.isLoading ||
    topRatedInfinite.isLoading;

  if (isLoading) return <LoadingContainer />;
  return (
    <>
      <Box sx={{ py: 4 }}>
        <Typography component="h1" variant="h2" noWrap>
          Movie Directory
        </Typography>
        <MovieSection
          title="Trending Movies"
          type="trending"
          data={trendingInfinite.data}
          fetchNextPage={trendingInfinite.fetchNextPage}
          hasNextPage={trendingInfinite.hasNextPage}
          isFetchingNextPage={trendingInfinite.isFetchingNextPage}
          isLoading={trendingInfinite.isLoading}
          isError={trendingInfinite.isError}
        />
        <MovieSection
          title="Now Playing"
          type="now_playing"
          data={nowPlayingInfinite.data}
          fetchNextPage={nowPlayingInfinite.fetchNextPage}
          hasNextPage={nowPlayingInfinite.hasNextPage}
          isFetchingNextPage={nowPlayingInfinite.isFetchingNextPage}
          isLoading={nowPlayingInfinite.isLoading}
          isError={nowPlayingInfinite.isError}
        />
        <MovieSection
          title="Top Rated"
          type="top_rated"
          data={topRatedInfinite.data}
          fetchNextPage={topRatedInfinite.fetchNextPage}
          hasNextPage={topRatedInfinite.hasNextPage}
          isFetchingNextPage={topRatedInfinite.isFetchingNextPage}
          isLoading={topRatedInfinite.isLoading}
          isError={topRatedInfinite.isError}
        />
      </Box>
    </>
  );
};

export default HomePage;
