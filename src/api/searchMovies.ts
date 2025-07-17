import axios from "axios";
import type { Movie } from "../types/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
      Language: "en-US",
    },
  });
  return res.data.results

    .filter((movie: Movie) => movie.vote_count > 50)
    .sort((a: Movie, b: Movie) => b.vote_average - a.vote_average);
};
