import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import {
  addFavourite,
  isFavourite as checkIsFavourite,
  removeFavourite,
} from "../utils/favouritesDB";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useFavourites } from "./useFavourites";

vi.mock("../utils/favouritesDB.ts", () => ({
  addFavourite: vi.fn(),
  removeFavourite: vi.fn(),
  isFavourite: vi.fn(),
}));

const mockMovie = {
  id: 1,
  title: "Test movie",
  overview: "Test overview",
  poster_path: "/test.jpg",
  runtime: 120,
  release_date: "2025-01-01",
  vote_average: 8.5,
  vote_count: 100,
  genre_ids: [18],
  genres: [{ id: 18, name: "Drama" }],
  cast: [],
  similar: [],
};

describe("useFavourites hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns false and does not check DB when no movie is passed", () => {
    const { result } = renderHook(() => useFavourites());
    expect(result.current.isFavourite).toBe(false);
    expect(checkIsFavourite).not.toHaveBeenCalled();
  });

  it("sets isFavourite to true if movie is already in favourites", async () => {
    (checkIsFavourite as Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useFavourites(mockMovie));

    await waitFor(() => {
      expect(result.current.isFavourite).toBe(true);
    });

    expect(checkIsFavourite).toHaveBeenCalledWith(mockMovie.id);
  });

  it("sets isFavourite to false if movie is not in favourites", async () => {
    (checkIsFavourite as Mock).mockResolvedValueOnce(false);

    const { result } = renderHook(() => useFavourites(mockMovie));

    await waitFor(() => {
      expect(result.current.isFavourite).toBe(false);
    });

    expect(checkIsFavourite).toHaveBeenCalledWith(mockMovie.id);
  });

  it("toggles from non-favourite to favourite", async () => {
    (checkIsFavourite as Mock).mockResolvedValueOnce(false);

    const { result } = renderHook(() => useFavourites(mockMovie));

    await waitFor(() => {
      expect(result.current.isFavourite).toBe(false);
    });

    await act(async () => {
      await result.current.toggleFavourite();
    });

    expect(addFavourite).toHaveBeenCalledWith(mockMovie);
    expect(result.current.isFavourite).toBe(true);
  });

  it("toggles from favourite to non-favourite", async () => {
    (checkIsFavourite as Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useFavourites(mockMovie));

    await waitFor(() => {
      expect(result.current.isFavourite).toBe(true);
    });

    await act(async () => {
      await result.current.toggleFavourite();
    });

    expect(removeFavourite).toHaveBeenCalledWith(mockMovie.id);
    expect(result.current.isFavourite).toBe(false);
  });

  it("does nothing if toggleFavourite is called with no movie", async () => {
    const { result } = renderHook(() => useFavourites());

    await act(async () => {
      await result.current.toggleFavourite();
    });

    expect(addFavourite).not.toHaveBeenCalled();
    expect(removeFavourite).not.toHaveBeenCalled();
    expect(result.current.isFavourite).toBe(false);
  });
});
