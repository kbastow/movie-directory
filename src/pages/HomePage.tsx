import React from "react";
import { Box, Typography } from "@mui/material";
import MovieSection from "../components/MovieSection";
import { useMovies } from "../hooks/useMovies";
import { useMediaQuery, useTheme } from "@mui/material";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import { CircularProgress } from "@mui/material";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Mobile
  const trendingMovies = useMovies("trending", 1);
  const nowPlayingMovies = useMovies("now_playing", 1);
  const topRatedMovies = useMovies("top_rated", 1);

  // Desktop
  const trendingInfinite = useInfiniteMovies("trending");
  const nowPlayingInfinite = useInfiniteMovies("now_playing");
  const topRatedInfinite = useInfiniteMovies("top_rated");

  const isLoading = isMobile
    ? trendingMovies.isLoading ||
      nowPlayingMovies.isLoading ||
      topRatedMovies.isLoading
    : trendingInfinite.isLoading ||
      nowPlayingInfinite.isLoading ||
      topRatedInfinite.isLoading;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Typography component="h1" variant="h2" sx={{ mb: 4 }} noWrap>
        Movie Directory
      </Typography>
      <MovieSection
        title="Trending Movies"
        type="trending"
        data={isMobile ? trendingMovies.data : trendingInfinite.data}
      />
      <MovieSection
        title="Now Playing"
        type="now_playing"
        data={isMobile ? nowPlayingMovies.data : nowPlayingInfinite.data}
      />
      <MovieSection
        title="Top Rated"
        type="top_rated"
        data={isMobile ? topRatedMovies.data : topRatedInfinite.data}
      />
    </>
  );
};

export default HomePage;
