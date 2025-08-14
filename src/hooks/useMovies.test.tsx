import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, it, vi, describe, beforeEach, type Mock } from "vitest";
import { useMovies } from "../hooks/useMovies";
import { fetchMoviesByType } from "../api/movies";

vi.mock("../api/movies.ts", () => ({
  fetchMoviesByType: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMovies hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading state initially", () => {
    (fetchMoviesByType as Mock).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useMovies("trending", 1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  describe("successful fetch", () => {
    const mockMovieData = { results: [{ id: 1, title: "Test movie" }] };

    beforeEach(() => {
      (fetchMoviesByType as Mock).mockResolvedValue(mockMovieData);
    });

    (["trending", "top_rated", "now_playing"] as const).forEach((category) => {
      it(`fetches and returns movies for category: ${category}`, async () => {
        const { result } = renderHook(() => useMovies(category, 1), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.data).toBeDefined();
          expect(result.current.data?.results[0].title).toBe("Test movie");
        });

        expect(fetchMoviesByType).toHaveBeenCalledWith(category, 1);
        expect(fetchMoviesByType).toHaveBeenCalledTimes(1);
      });
    });
  });
});
