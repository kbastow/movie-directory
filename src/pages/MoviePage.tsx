import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  styled
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { getImageUrl } from "../utils/getImageUrl";
import HorizontalScroller from "../components/HorizontalScroller";
import MoviePoster from "../components/MoviePoster";
import FavouriteToggleButton from "../components/FavouriteToggleButton";
import LoadingContainer from "../components/LoadingContainer";

const PageContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DetailsStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  alignItems: "flex-start",
}));

const PosterImage = styled("img")(({ theme }) => ({
  width: 300,
  height: "100%",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    width: 280,
  },
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
}));

const CastSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const CastItem = styled(Box)(() => ({
  textAlign: "center",
  width: "100%",
}));

const CastImage = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: theme.spacing(1),
  marginLeft: "auto",
  marginRight: "auto",
}));

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: movie, isLoading, isError } = useMovieDetails(Number(movieId));

  if (isLoading)
    return <LoadingContainer />;

  if (isError || !movie)
    return <Typography color="error">Movie not found</Typography>;

  return (
    <PageContainer >

      <DetailsStack
        direction={isMobile ? "column" : "row"}
        spacing={4}
      >
        <PosterImage          
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}          
        />
        <Box>
          <TitleRow>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              {movie.title}
            </Typography>
            <FavouriteToggleButton movie={movie} />
          </TitleRow>

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

          
          <CastSection>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cast
            </Typography>
            <Grid container spacing={2}>
              {movie.cast.slice(0, 6).map((member) => (
                <Grid size={{ md: 2, xs: 4 }} key={member.id}>
                  <CastItem>
                    <CastImage                      
                      src={getImageUrl(member.profile_path, "w154")}
                      alt={member.name}                      
                    />
                    <Typography variant="subtitle2">
                      {member.character}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.name}
                    </Typography>
                  </CastItem>
                </Grid>
              ))}
            </Grid>
          </CastSection>
        </Box>
      </DetailsStack>

      {/* Similar Movies */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          You might also like
        </Typography>
        <HorizontalScroller showArrowsOnMobile>
          {movie.similar.slice(0, 12).map((sim) => (
            <MoviePoster
              key={sim.id}
              id={sim.id}
              title={sim.title}
              poster_path={sim.poster_path}
            />
          ))}
        </HorizontalScroller>
      </Box>
    </PageContainer>
  );
};

export default MoviePage;
