import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { adminAPI } from "../services/api.js";

export default function LeftSidebar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Actualización de contenido");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePush = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await adminAPI.gitPush(message || "Actualización de contenido");
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

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

      {/* Sección Publicar en GitHub */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        {!open ? (
          <button
            onClick={() => { setOpen(true); setResult(null); }}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium transition"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Publicar en GitHub
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Publicar en GitHub</span>
              <button
                onClick={() => { setOpen(false); setResult(null); }}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mensaje del commit"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              disabled={loading}
            />
            <button
              onClick={handlePush}
              disabled={loading}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm py-1.5 rounded-lg transition"
            >
              {loading ? "Publicando..." : "Subir cambios"}
            </button>
            {result && !result.error && (
              <div className="space-y-1 text-xs">
                {["backend", "frontend"].map((repo) => (
                  <div
                    key={repo}
                    className={`flex items-start gap-1 px-2 py-1 rounded ${
                      result[repo]?.status === "ok"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <span>{result[repo]?.status === "ok" ? "✓" : "✗"}</span>
                    <span><strong>{repo}:</strong> {result[repo]?.message}</span>
                  </div>
                ))}
              </div>
            )}
            {result?.error && (
              <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">{result.error}</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
