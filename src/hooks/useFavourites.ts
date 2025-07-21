import { useEffect, useState } from "react";
import {
  addFavourite,
  removeFavourite,
  isFavourite as checkIsFavourite,
} from "../utils/favouritesDB";
import type { Movie } from "../types/movies";
import type { MovieDetail } from "../types/movieDetails";

export const useFavourites = (movie?: Movie | MovieDetail) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!movie) return;
    const checkStatus = async () => {
      const exists = await checkIsFavourite(movie.id);
      setIsFavourite(exists);
    };
    checkStatus();
  }, [movie]);

  const toggleFavourite = async () => {
    if (!movie) return;

    if (isFavourite) {
      await removeFavourite(movie.id);
      setIsFavourite(false);
    } else {
      await addFavourite(movie);
      setIsFavourite(true);
    }
  };

  return { isFavourite, toggleFavourite };
};
