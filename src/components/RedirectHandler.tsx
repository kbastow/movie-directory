import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedPath = localStorage.getItem("redirectPath");
    if (storedPath) {
      localStorage.removeItem("redirectPath");
      const cleanedPath = storedPath.replace(/^\/movie-directory/, "");
      navigate(cleanedPath || "/", { replace: true });
    }
  }, [navigate]);
  return null;
};

export default RedirectHandler;
