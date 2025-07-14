const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesByType = async (
  type: "trending" | "top_rated" | "now_playing",
  page = 1
) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  let url = "";

  switch (type) {
    case "trending":
      url = `${BASE_URL}/trending/movie/day?api_key=${apiKey}&page=${page}`;
      break;
    case "top_rated":
      url = `${BASE_URL}/movie/top_rated?api_key=${apiKey}&page=${page}`;
      break;
    case "now_playing":
      url = `${BASE_URL}/movie/now_playing?api_key=${apiKey}&page=${page}`;
      break;
    default:
      throw new Error("Invalid movie type");
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return res.json();
};
