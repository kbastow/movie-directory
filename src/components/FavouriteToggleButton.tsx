import { IconButton, Snackbar } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useFavourites } from "../hooks/useFavourites";
import type { Movie } from "../types/movies";
import type { MovieDetail } from "../types/movieDetails";
import type { FavouriteMovie } from "../types/favouriteMovie";
import { favouriteButtonStyles } from "../styles/buttonStyles";
import { useState } from "react";

type Props = {
  movie: Movie | MovieDetail | FavouriteMovie;
  sx?: object;
};

const FavouriteToggleButton = ({ movie, sx = {} }: Props) => {
  // Convert FavouriteMovie to Movie if needed
  const movieForFavourites =
    "id" in movie && ("title" in movie || "name" in movie)
      ? (movie as Movie | MovieDetail)
      : undefined;

  const { isFavourite, toggleFavourite } = useFavourites(movieForFavourites);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToFavourties = () => {
    toggleFavourite();
    setShowMessage(true);
  };

  const handleRemoveFromFavourites = () => {
    setShowMessage(false);
  };

  return (
    <>
      <IconButton
        onClick={handleAddToFavourties}
        sx={{
          ...favouriteButtonStyles,
          ...sx,
        }}
        aria-label="add to favourites"
        disableRipple
      >
        {isFavourite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
      <Snackbar
        sx={{
          textAlign: "center",
        }}
        open={showMessage}
        autoHideDuration={2000}
        onClose={handleRemoveFromFavourites}
        message={
          isFavourite ? "Added to favourites" : "Removed from favourites"
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{
          content: {
            sx: { justifyContent: "center" },
          },
        }}
      />
    </>
  );
};

export default FavouriteToggleButton;
