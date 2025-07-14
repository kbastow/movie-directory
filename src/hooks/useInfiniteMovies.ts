import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoviesByType } from "../api/movies";
import type { MovieApiResponse } from "../types/movies";

export const useInfiniteMovies = (
  type: "trending" | "now_playing" | "top_rated"
) => {
  return useInfiniteQuery<MovieApiResponse, Error>({
    queryKey: ["movies", type],
    queryFn: ({ pageParam }) => fetchMoviesByType(type, pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
