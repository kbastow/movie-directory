import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FavouritesPage from "../pages/FavouritesPage";
import MoviePage from "../pages/MoviePage";
import AppLayout from "../layout/AppLayout";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="movie" element={<MoviePage />} />
      <Route path="*" element={<PageNotFound />}></Route>
    </Route>
  </Routes>
);

export default AppRoutes;
