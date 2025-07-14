import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByType } from "../api/movies";

export const useMovies = (
  type: "trending" | "now_playing" | "top_rated",
  page: number
) => {
  return useQuery({
    queryKey: ["movies", type, page],
    queryFn: () => fetchMoviesByType(type, page),
    staleTime: 1000 * 60 * 5,
  });
};
