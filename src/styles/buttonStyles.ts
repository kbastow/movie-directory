import theme from "./theme";

export const favouriteButtonStyles = {
  width: "44px",
  height: "44px",
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#24345a",
  },
};
