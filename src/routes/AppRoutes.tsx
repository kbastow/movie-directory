import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../page/HomePage";
import FavouritesPage from "../page/FavouritesPage";
import MoviePage from "../page/MoviePage";
import AppLayout from "../layout/AppLayout";
import PageNotFound from "../page/PageNotFound";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="movie/:movieId" element={<MoviePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
