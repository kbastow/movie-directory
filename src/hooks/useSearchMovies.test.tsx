import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { searchMovies } from "../api/searchMovies";
import { useSearchMovies } from "./useSearchMovies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("../api/searchMovies.ts", () => ({
  searchMovies: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("searchMovies hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches movies when a query is entered in the search input", async () => {
    (searchMovies as Mock).mockResolvedValueOnce([
      { id: 1, title: "Test movie" },
    ]);

    const { result } = renderHook(() => useSearchMovies("matrix"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(searchMovies).toHaveBeenCalledWith("matrix");
    expect(result.current.data).toEqual([{ id: 1, title: "Test movie" }]);
  });

  it("does not fetch when the query is empty", async () => {
    const { result } = renderHook(() => useSearchMovies(""), {
      wrapper: createWrapper(),
    });

    expect(searchMovies).not.toHaveBeenCalled();
    expect(result.current.isFetching).toBe(false);
  });

  it("handles errors", async () => {
    (searchMovies as Mock).mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useSearchMovies("fail"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("API Error");
  });
});
