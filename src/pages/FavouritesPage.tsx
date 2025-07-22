import { useEffect, useState } from "react";
import { getFavourites } from "../utils/favouritesDB";
import type { FavouriteMovie } from "../types/favouriteMovie";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MoviePoster from "../components/MoviePoster";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<FavouriteMovie[]>([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const saved = await getFavourites();
      setFavourites(saved);
    };
    fetchFavourites();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favourites
      </Typography>

      {favourites.length === 0 ? (
        <Typography variant="body1">No favourites saved yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favourites.map((movie) => (
            <Grid key={movie.id}>
              <MoviePoster
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavouritesPage;
