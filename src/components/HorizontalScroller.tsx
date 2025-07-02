import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  useTheme,
  styled,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { useRef } from "react";

type HorizontalScrollerProps = {
  children: React.ReactNode;
  scrollAmount?: number;
};

const ScrollWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
}));

const ScrollContent = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(3),
  padding: `${theme.spacing(6)} ${theme.spacing(4)}`,
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
  scrollAmount = 300,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const delta = direction === "left" ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <ScrollWrapper>
      {!isMobile && (
        <ArrowButton onClick={() => scroll("left")} sx={{ left: 0 }}>
          <ArrowBackIos />
        </ArrowButton>
      )}

      <ScrollContent ref={scrollRef}>{children}</ScrollContent>

      {!isMobile && (
        <ArrowButton onClick={() => scroll("right")} sx={{ right: 0 }}>
          <ArrowForwardIos />
        </ArrowButton>
      )}
    </ScrollWrapper>
  );
};

export default HorizontalScroller;
