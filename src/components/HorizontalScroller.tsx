import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  useTheme,
  styled,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef } from "react";

type HorizontalScrollerProps = {
  children: React.ReactNode;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
};

const ScrollWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
}));

const ScrollContent = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(2),
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  "&:hover": { backgroundColor: theme.palette.grey[200] },
}));

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  hasNextPage,
  fetchNextPage,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current || !cardRef.current) return;
    const cardWidth = cardRef.current.offsetWidth;
    const gapPx = parseInt(theme.spacing(2).replace("px", ""), 10);
    const amount = cardWidth + gapPx;
    const delta = direction === "left" ? -amount : amount;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

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
      {!isMobile && (
        <ArrowButton onClick={() => scroll("left")} sx={{ left: 0 }}>
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

      {!isMobile && (
        <ArrowButton onClick={() => scroll("right")} sx={{ right: 0 }}>
          <ArrowForwardIos />
        </ArrowButton>
      )}
    </ScrollWrapper>
  );
};

export default HorizontalScroller;
