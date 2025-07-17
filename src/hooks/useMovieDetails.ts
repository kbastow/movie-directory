import { useQuery } from "@tanstack/react-query";
import type { MovieDetail } from "../types/movieDetails";
import { fetchMovieDetails } from "../api/movieDetails";

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetail>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};
