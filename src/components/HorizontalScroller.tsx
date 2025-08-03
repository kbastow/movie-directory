import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  useTheme,
  styled,
  IconButton,
  useMediaQuery,
  alpha,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type HorizontalScrollerProps = {
  children: React.ReactNode;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  showArrowsOnMobile?: boolean;
};

const ScrollWrapper = styled(Box)(() => ({
  position: "relative",
}));

const ScrollContent = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(2),
  padding: `${theme.spacing(1)}`,
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 9,
  backgroundColor: alpha(theme.palette.primary.main, 0.85),
  boxShadow: theme.shadows[2],
  "&:hover": { backgroundColor: alpha(theme.palette.background.paper, 0.85) },
}));

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  hasNextPage,
  fetchNextPage,
  showArrowsOnMobile = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const shouldShowArrows = !isMobile || (isMobile && showArrowsOnMobile);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current || !cardRef.current) return;
    const cardWidth = cardRef.current.offsetWidth;
    const gapPx = parseInt(theme.spacing(2).replace("px", ""), 10);
    const containerWidth = scrollRef.current.clientWidth;
    const cardsVisible = Math.floor(containerWidth / (cardWidth + gapPx));
    const amount = (cardWidth + gapPx) * (cardsVisible || 1);
    const delta = direction === "left" ? -amount : amount;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setAtStart(scrollLeft <= 50);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    handleScroll();

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasNextPage || !fetchNextPage) return;
    const sentinel = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { root: scrollRef.current, rootMargin: "0px", threshold: 1.0 }
    );
    if (sentinel) {
      observer.observe(sentinel);
    }
    return () => {
      if (sentinel) {
        observer.observe(sentinel);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const childrenArray = React.Children.toArray(children);

  return (
    <ScrollWrapper>
      {shouldShowArrows && (
        <ArrowButton
          onClick={() => scroll("left")}
          sx={{
            left: -15,
          }}
          disabled={atStart}
          disableRipple
        >
          <ArrowBackIos />
        </ArrowButton>
      )}

      <ScrollContent ref={scrollRef}>
        {childrenArray.map((child, index) => (
          <div
            key={index}
            ref={index === 0 ? cardRef : undefined}
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
        {hasNextPage && (
          <div
            ref={sentinelRef}
            style={{
              width: 1,
              height: 1,
              scrollSnapAlign: "start",
            }}
          />
        )}
      </ScrollContent>

      {shouldShowArrows && (
        <ArrowButton
          onClick={() => scroll("right")}
          sx={{
            right: -15,
          }}
          disabled={atEnd}
          disableRipple
        >
          <ArrowForwardIos />
        </ArrowButton>
      )}
    </ScrollWrapper>
  );
};

export default HorizontalScroller;
