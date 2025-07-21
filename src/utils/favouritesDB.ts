import { openDB } from "idb";
import type { FavouriteMovie } from "../types/favouriteMovie";

const DB_NAME = "movie-favourites-db";
const STORE_NAME = "favourites";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: "id" });
  },
});

export const addFavourite = async (movie: FavouriteMovie) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, movie);
};

export const removeFavourite = async (movieId: number) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, movieId);
};

export const getFavourites = async (): Promise<FavouriteMovie[]> => {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
};

export const isFavourite = async (movieId: number): Promise<boolean> => {
  const db = await dbPromise;
  const movie = await db.get(STORE_NAME, movieId);
  return !!movie;
};
