import theme from "./theme";

export const favouriteButtonStyles = {
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#24345a",
  },
};
