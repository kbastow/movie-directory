import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useFavourites } from "../hooks/useFavourites";
import type { Movie } from "../types/movies";
import type { MovieDetail } from "../types/movieDetails";

type Props = {
  movie: Movie | MovieDetail;
  sx?: object;
};

const FavouriteToggleButton = ({ movie, sx = {} }: Props) => {
  const { isFavourite, toggleFavourite } = useFavourites(movie);

  return (
    <IconButton
      onClick={toggleFavourite}
      sx={{
        width: "44px",
        height: "44px",
        backgroundColor: "#80808075",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#808080",
        },
        ...sx,
      }}
      aria-label="add to favourites"
    >
      {isFavourite ? <Favorite color="error" /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavouriteToggleButton;
