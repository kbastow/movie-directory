import React from "react";
import { Typography } from "@mui/material";
import MovieSection from "../components/MovieSection";

const HomePage: React.FC = () => {
  return (
    <>
      <Typography component="h1" variant="h2" sx={{ mb: 4 }} noWrap>
        Movie Directory
      </Typography>
      <MovieSection title="Trending Movies" type="trending" />
      <MovieSection title="Now Playing" type="now_playing" />
      <MovieSection title="Top Rated" type="top_rated" />
    </>
  );
};

export default HomePage;
