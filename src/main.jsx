import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Proyectos from "./pages/Proyectos.jsx";
import Material from "./pages/Material.jsx";
import Creadores from "./pages/Creadores.jsx";
import Juegos from "./pages/Juegos.jsx";
import ProyectoIndividual from "./pages/ProyectoIndividual.jsx";
import MaterialIndividual from "./pages/MaterialIndividual.jsx";
import PerfilCreador from "./pages/PerfilCreador.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Aquí vive tu layout principal con sidebars
    children: [
      { index: true, element: <Home /> },
      { path: "proyectos", element: <Proyectos /> },
      { path: "proyectos/:id", element: <ProyectoIndividual /> },
      { path: "material", element: <Material /> },
      { path: "material/:id", element: <MaterialIndividual /> },
      { path: "creadores", element: <Creadores /> },
      { path: "creadores/:id", element: <PerfilCreador /> },
      { path: "juegos", element: <Juegos /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
