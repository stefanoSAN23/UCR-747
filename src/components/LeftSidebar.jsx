import React from "react";
import { NavLink } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Menú</h2>
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/proyectos"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Proyectos
        </NavLink>

        <NavLink
          to="/material"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Materiales
        </NavLink>

        <NavLink
          to="/creadores"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Creadores
        </NavLink>


        <NavLink
          to="/juegos"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Juegos
        </NavLink>
      </nav>
    </aside>
  );
}
