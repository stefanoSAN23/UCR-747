import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Izquierdo */}
      <LeftSidebar />

      {/* Contenido Central (Outlet cambia dinámicamente) */}
      <main className="flex-1 ml-64 mr-64 overflow-y-auto p-8">
        <Outlet />
      </main>

      {/* Sidebar Derecho */}
      <RightSidebar />
    </div>
  );
}
