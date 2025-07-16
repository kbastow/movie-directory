import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/searchMovies";

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["searchMovies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
};
