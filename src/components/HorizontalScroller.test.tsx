import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import HorizontalScroller from "./HorizontalScroller";
import { beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    constructor() {}
  }

  window.IntersectionObserver = vi.fn(function (
    this: IntersectionObserver,
    cb: IntersectionObserverCallback
  ) {
    (
      window.IntersectionObserver as {
        mockCallback?: IntersectionObserverCallback;
      }
    ).mockCallback = cb;
    return new MockIntersectionObserver();
  }) as unknown as typeof IntersectionObserver;
});

function mockMediaQuery(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("HorizontalScroller component", () => {
  describe("basic rendering", () => {
    it("renders children inside the scroller", () => {
      render(
        <HorizontalScroller>
          <div>Movie Card 1</div>
          <div>Movie Card 2</div>
        </HorizontalScroller>
      );

      expect(screen.getByText("Movie Card 1")).toBeInTheDocument();
      expect(screen.getByText("Movie Card 2")).toBeInTheDocument();
    });
  });

  describe("arrow button visibility", () => {
    it("shows navigation arrows on desktop screens", () => {
      mockMediaQuery(false);
      render(
        <HorizontalScroller>
          <div>Movie Card</div>
        </HorizontalScroller>
      );

      expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /forward/i })
      ).toBeInTheDocument();
    });

    it("hides navigation arrows on mobile unless showArrowsOnMobile is true", () => {
      mockMediaQuery(true);
      const { rerender } = render(
        <HorizontalScroller>
          <div>Item</div>
        </HorizontalScroller>
      );

      expect(screen.queryByRole("button")).not.toBeInTheDocument();

      rerender(
        <HorizontalScroller showArrowsOnMobile>
          <div>Item</div>
        </HorizontalScroller>
      );

      expect(
        screen.getByRole("button", { name: /forward/i })
      ).toBeInTheDocument();
    });
  });

  describe("scrolling behaviour", () => {
    it("clicking right arrow scrolls the content", () => {
      mockMediaQuery(false);

      render(
        <div style={{ width: 150, overflow: "hidden" }}>
          <HorizontalScroller>
            <div style={{ width: 300 }}>Movie Card 1</div>
            <div style={{ width: 300 }}>Movie Card 2</div>
          </HorizontalScroller>
        </div>
      );

      const scroller = screen.getByTestId("scroller");
      const scrollBySpy = vi.fn();
      scroller.scrollBy = scrollBySpy;

      Object.defineProperty(scroller, "clientWidth", {
        configurable: true,
        value: 150,
      });
      Object.defineProperty(scroller, "scrollWidth", {
        configurable: true,
        value: 300,
      });

      fireEvent.scroll(scroller);

      const rightArrow = screen.getByRole("button", { name: /forward/i });
      expect(rightArrow).not.toBeDisabled();

      fireEvent.click(rightArrow);

      expect(scrollBySpy).toHaveBeenCalledWith(
        expect.objectContaining({ left: expect.any(Number) })
      );
    });
  });

  describe("infinite loading", () => {
    it("calls fetchNextPage when sentinel enters viewport - infinite scrolling", () => {
      const fetchNextPage = vi.fn();

      render(
        <HorizontalScroller hasNextPage fetchNextPage={fetchNextPage}>
          <div>Item</div>
        </HorizontalScroller>
      );

      act(() => {
        (
          window.IntersectionObserver as typeof window.IntersectionObserver & {
            mockCallback?: IntersectionObserverCallback;
          }
        ).mockCallback?.(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          undefined as unknown as IntersectionObserver
        );
      });

      expect(fetchNextPage).toHaveBeenCalled();
    });
  });
});
