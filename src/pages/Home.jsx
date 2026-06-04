import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI, creatorsAPI, materialsAPI } from "../services/api.js";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [creators, setCreators] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, creatorsData, materialsData] = await Promise.all([
          projectsAPI.getAll().catch(() => []),
          creatorsAPI.getAll().catch(() => []),
          materialsAPI.getAll().catch(() => []),
        ]);
        
        setProjects(projectsData.slice(0, 3));
        setCreators(creatorsData.slice(0, 3));
        setMaterials(materialsData.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="text-center py-16">
          <div className="inline-block w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando contenido...</p>
          <p className="text-gray-400 text-sm mt-2">
            Si es la primera visita del día, el servidor puede tardar hasta 60 segundos en despertar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-blue-400 rounded-2xl p-16 mb-8 text-center shadow">
        <h1 className="text-3xl font-bold text-white">TC-747</h1>
        <p className="text-white mt-1 text-lg">Proyectos y Material Académico</p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* Proyectos Destacados */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Proyectos Destacados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((p) => (
              <div key={p.project_id} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
                <img
                  src={p.photo_project || "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=60"}
                  alt={p.name_project}
                  className="h-32 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-1">{p.name_project}</h3>
                <p className="text-sm text-gray-500 mb-3">{p.description || "Sin descripción"}</p>
                <Link
                  to={`/proyectos/${p.project_id}`}
                  className="inline-block bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500"
                >
                  Ver detalles
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-4">No hay proyectos disponibles</p>
          )}
        </div>
        {projects.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Link
              to="/proyectos"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition"
            >
              Ver todos los proyectos
            </Link>
          </div>
        )}
      </section>

      {/* Creadores Destacados */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Creadores Destacados</h2>
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Carrera</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {creators.length > 0 ? (
                creators.map((c) => (
                  <tr key={c.creator_id} className="border-t">
                    <td className="px-4 py-2">{c.name_creator}</td>
                    <td className="px-4 py-2">{c.career || "N/A"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.state === "Activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.state || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        to={`/creadores/${c.creator_id}`}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        Ver trabajos
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No hay creadores disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botón Ver más */}
        <div className="mt-4 flex justify-center">
          <Link
            to="/creadores"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition"
          >
            Ver más creadores
          </Link>
        </div>
      </section>

      {/* Material Académico */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Materiales Académicos Más Utilizados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.length > 0 ? (
            materials.map((m) => (
              <div key={m.material_id} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
                <img
                  src={m.photo_material || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60"}
                  alt={m.name_material}
                  className="h-32 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-1">{m.name_material}</h3>
                <p className="text-sm text-gray-500 mb-3">{m.description || "Sin descripción"}</p>
                <Link
                  to={`/material/${m.material_id}`}
                  className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Ver detalles
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-4">No hay materiales disponibles</p>
          )}
        </div>
        {materials.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Link
              to="/material"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition"
            >
              Ver todos los materiales
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
