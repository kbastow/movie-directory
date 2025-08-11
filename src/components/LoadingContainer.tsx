import { Box, CircularProgress, styled } from "@mui/material";

const Root = styled(Box)({
  display: "flex",
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
});

const LoadingContainer = () => (
  <Root>
    <CircularProgress />
  </Root>
);

export default LoadingContainer;
