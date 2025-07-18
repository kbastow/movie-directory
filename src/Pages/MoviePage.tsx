import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { getImageUrl } from "../utils/getImageUrl";
import HorizontalScroller from "../components/HorizontalScroller";

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: movie, isLoading, isError } = useMovieDetails(Number(movieId));

  if (isLoading) return <CircularProgress />;
  if (isError || !movie)
    return <Typography color="error">Movie not found</Typography>;

  return (
    <Box
      sx={{
        py: isMobile ? 3 : 4,
        px: isMobile ? 2 : 4,
      }}
    >
      {/* Movie Details */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={4}
        alignItems="flex-start"
        sx={{ mb: 6 }}
      >
        <Box
          component="img"
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          sx={{
            width: isMobile ? "100%" : 300,
            maxWidth: isMobile ? 300 : "auto",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
        <Box>
          <Typography variant="h4" component="h1">
            {movie.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {movie.release_date.slice(0, 4)} · {movie.runtime} mins |{" "}
            {movie.vote_average.toFixed(1)} ⭐
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.overview}
          </Typography>
          <Typography variant="caption">
            {movie.genres?.map((genre) => genre.name).join(", ")}
          </Typography>
          {/* Cast Members */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cast
            </Typography>
            <Stack
              direction="row"
              gap={2}
              flexWrap="wrap"
              justifyContent="flex-start"
            >
              {movie.cast.slice(0, 6).map((member) => (
                <Box
                  key={member.id}
                  sx={{
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={getImageUrl(member.profile_path, "w154")}
                    alt={member.name}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mb: 1,
                      mx: "auto",
                    }}
                  />
                  <Typography variant="subtitle2">
                    {member.character}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>

      {/* Similar Movies */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          You might also like
        </Typography>
        <HorizontalScroller showArrowsOnMobile>
          {movie.similar.slice(0, 8).map((sim) => (
            <Box
              key={sim.id}
              sx={{
                width: 100,
                flex: "0 0 auto",
              }}
            >
              <Box
                component="img"
                src={getImageUrl(sim.poster_path, "w154")}
                alt={sim.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.location.href = `/movie/${sim.id}`;
                }}
              />
            </Box>
          ))}
        </HorizontalScroller>
      </Box>
    </Box>
  );
};

export default MoviePage;
