import { Container } from "@mui/material";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AppLayout;
