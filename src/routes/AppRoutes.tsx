import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import FavouritesPage from "../Pages/FavouritesPage";
import MoviePage from "../Pages/MoviePage";
import AppLayout from "../layout/AppLayout";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="movie/:id" element={<MoviePage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
