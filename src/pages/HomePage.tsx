import React from "react";
import { Box, Typography } from "@mui/material";
import MovieSection from "../components/MovieSection";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import LoadingContainer from "../components/LoadingContainer";

const HomePage: React.FC = () => {
  const trendingInfinite = useInfiniteMovies("trending");
  const nowPlayingInfinite = useInfiniteMovies("now_playing");
  const topRatedInfinite = useInfiniteMovies("top_rated");

  const sections: {
    title: string;
    type: "trending" | "now_playing" | "top_rated";
    infinite: typeof trendingInfinite;
  }[] = [
    {
      title: "Trending Movies",
      type: "trending",
      infinite: trendingInfinite,
    },
    {
      title: "Now Playing",
      type: "now_playing",
      infinite: nowPlayingInfinite,
    },
    {
      title: "Top Rated",
      type: "top_rated",
      infinite: topRatedInfinite,
    },
  ];

  const isLoading = sections.some((s) => s.infinite.isLoading);

  if (isLoading) return <LoadingContainer />;

  return (
    <>
      <Box sx={{ py: 4 }}>
        <Typography component="h1" variant="h2" noWrap>
          Movie Directory
        </Typography>
        {sections.map((section) => (
          <MovieSection
            key={section.type}
            title={section.title}
            type={section.type}
            data={section.infinite.data}
            fetchNextPage={section.infinite.fetchNextPage}
            hasNextPage={section.infinite.hasNextPage}
            isFetchingNextPage={section.infinite.isFetchingNextPage}
            isLoading={section.infinite.isLoading}
            isError={section.infinite.isError}
          />
        ))}
      </Box>
    </>
  );
};

export default HomePage;
