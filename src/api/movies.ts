const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async (page = 1) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${apiKey}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
};
