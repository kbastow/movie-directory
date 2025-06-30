import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/movies";

export const useTrendingMovies = (page = 1) => {
  return useQuery({
    queryKey: ["trendingMovies", page],
    queryFn: () => fetchTrendingMovies(page),
    staleTime: 1000 * 60 * 5,
  });
};
