export const getImageUrl = (
  path: string | null,
  size: "w154" | "w342" | "w500" | "w780" | "original" = "w154"
): string => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "https://placehold.co/160x240?text=No+image";
};
