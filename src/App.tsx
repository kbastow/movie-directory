import React from "react";
import AppRoutes from "./routes/AppRoutes";

import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </>
);

export default App;
