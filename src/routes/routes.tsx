import React from "react";
import { Routes, Route } from "react-router-dom";
import Directory from "../components/Directory";
import Favourites from "../components/Favourites";

const routeConfig = [
  { path: "/", element: <Directory /> },
  { path: "/favourites", element: <Favourites /> },
];

const AppRoutes: React.FC = () => (
  <Routes>
    {routeConfig.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRoutes;
