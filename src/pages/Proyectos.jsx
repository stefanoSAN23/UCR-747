import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../services/api.js";

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getAll();
        setProyectos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching proyectos:", err);
        setError("Error al cargar los proyectos. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Proyectos Destacados</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Proyectos Destacados</h1>
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {proyectos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div
              key={p.project_id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={p.photo_project || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"}
                alt={p.name_project}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{p.name_project}</h3>
              <p className="text-sm text-gray-500 mb-2">{p.description || "Sin descripción"}</p>
              <Link
                to={`/proyectos/${p.project_id}`}
                className="inline-block bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay proyectos disponibles</p>
        </div>
      )}
    </div>
  );
}
  