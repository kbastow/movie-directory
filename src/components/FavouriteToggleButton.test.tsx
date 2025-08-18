import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavouriteToggleButton from "./FavouriteToggleButton";
import { useFavourites } from "../hooks/useFavourites";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";

vi.mock("../hooks/useFavourites", () => ({
  useFavourites: vi.fn(),
}));

const mockMovie = {
  id: 1,
  title: "Movie title",
  poster_path: "poster.jpg",
  vote_average: 8.8,
};

describe("FavouriteToggleButton component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when the movie is not a favourite or removed from favourites", () => {
    beforeEach(() => {
      (useFavourites as Mock).mockReturnValue({
        isFavourite: false,
        toggleFavourite: vi.fn(),
      });
    });

    it("should render a border heart icon", () => {
      render(<FavouriteToggleButton movie={mockMovie} />);
      expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
    });

    it("should toggle favourite and show a snackbar message when clicked", async () => {
      const toggleFavourite = vi.fn();
      (useFavourites as Mock).mockReturnValue({
        isFavourite: false,
        toggleFavourite,
      });

      render(<FavouriteToggleButton movie={mockMovie} />);

      fireEvent.click(
        screen.getByRole("button", { name: /add to favourites/i })
      );

      expect(toggleFavourite).toHaveBeenCalled();

      expect(
        await screen.findByText(/removed from favourites/i)
      ).toBeInTheDocument();
    });
  });

  describe("when the movie is a favourite or is added to favourites", () => {
    beforeEach(() => {
      (useFavourites as Mock).mockReturnValue({
        isFavourite: true,
        toggleFavourite: vi.fn(),
      });
    });

    it("should render a filled heart icon", () => {
      render(<FavouriteToggleButton movie={mockMovie} />);
      expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
    });

    it("should show 'Added to favourites' snackbar when clicked", async () => {
      render(<FavouriteToggleButton movie={mockMovie} />);

      fireEvent.click(
        screen.getByRole("button", { name: /add to favourites/i })
      );

      expect(
        await screen.findByText(/added to favourites/i)
      ).toBeInTheDocument();
    });
  });

  describe("snackbar lifecycle", () => {
    it("should disappear automatically after autoHideDuration", async () => {
      (useFavourites as Mock).mockReturnValue({
        isFavourite: true,
        toggleFavourite: vi.fn(),
      });

      render(<FavouriteToggleButton movie={mockMovie} />);

      fireEvent.click(
        screen.getByRole("button", { name: /add to favourites/i })
      );

      const snackbar = await screen.findByText(/added to favourites/i);
      expect(snackbar).toBeInTheDocument();

      await waitFor(() => expect(snackbar).not.toBeVisible(), {
        timeout: 2000,
      });
    });
  });
});
