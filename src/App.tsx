import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";
import RedirectHandler from "./components/RedirectHandler";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <>
    <BrowserRouter basename="/movie-directory">
      <RedirectHandler />
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </>
);

export default App;
