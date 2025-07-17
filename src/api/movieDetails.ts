import axios from "axios";
import type { MovieDetail } from "../types/movieDetails";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetail> => {
  const [detailsRes, creditsRes, similarRes] = await Promise.all([
    axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY },
    }),
    axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY },
    }),
    axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: { api_key: API_KEY },
    }),
  ]);
  return {
    ...detailsRes.data,
    cast: creditsRes.data.cast,
    similar: similarRes.data.results,
  };
};
