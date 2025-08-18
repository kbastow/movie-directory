import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import MovieCard from "./MovieCard";
import { useMediaQuery } from "@mui/material";

vi.mock("../utils/getImageUrl", () => ({
  getImageUrl: vi.fn((path: string) => `mocked-url/${path}`),
}));

vi.mock("@mui/material", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mui/material")>();
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

vi.mock("@mui/material", async () => {
  const mod = await vi.importActual<typeof import("@mui/material")>(
    "@mui/material"
  );
  return {
    ...mod,
    useMediaQuery: vi.fn(() => false),
  };
});

const mockMovie = {
  id: 123,
  title: "Test Movie",
  poster_path: "testposter.jpg",
  release_date: "2025-01-01",
  vote_average: 8.5,
  vote_count: 1000,
  adult: false,
  original_language: "en",
};

describe("MovieCard component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie details", () => {
    (useMediaQuery as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Test Movie")).toHaveAttribute(
      "src",
      "mocked-url/testposter.jpg"
    );
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("navigates to the correct link", () => {
    (useMediaQuery as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/123");
  });

  it("shows overlay on hover in desktop mode", () => {
    (useMediaQuery as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const overlay = screen.getByTestId("movie-overlay")!;
    expect(overlay).toHaveStyle("opacity: 0");

    fireEvent.mouseEnter(screen.getByTestId("movie-overlay"));
    expect(overlay).toHaveStyle("opacity: 1");

    fireEvent.mouseLeave(screen.getByTestId("movie-overlay"));
    expect(overlay).toHaveStyle("opacity: 0");
  });

  it("does not toggle overlay on hover in mobile mode", () => {
    (useMediaQuery as Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const overlay = screen.getByText("Test Movie").parentElement!;
    expect(overlay).toHaveStyle("opacity: 0");

    fireEvent.mouseEnter(screen.getByRole("link"));
    expect(overlay).toHaveStyle("opacity: 0");
  });
});
