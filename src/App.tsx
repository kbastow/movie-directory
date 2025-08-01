import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath) {
      localStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  return null;
};

const App: React.FC = () => (
  <>
    <BrowserRouter basename="/movie-directory">
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <RedirectHandler />
        <AppRoutes />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </>
);

export default App;
